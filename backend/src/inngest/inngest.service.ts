import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { inngest } from './inngest.client';
import { NonRetriableError } from 'inngest';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

import { Class, ClassDocument } from '../modules/classes/schemas/class.schema';
import { User, UserDocument } from '../modules/users/schemas/user.schema';
import { Timetable, TimetableDocument } from '../modules/timetables/schemas/timetable.schema';
import { Exam, ExamDocument, Submission, SubmissionDocument } from '../modules/exams/schemas/exam.schema';

@Injectable()
export class InngestService {
    constructor(
        @InjectModel(Class.name) private classModel: Model<ClassDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Timetable.name) private timetableModel: Model<TimetableDocument>,
        @InjectModel(Exam.name) private examModel: Model<ExamDocument>,
        @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>,
    ) { }

    getFunctions() {
        return [
            this.createGenerateTimeTableFunction(),
            this.createGenerateExamFunction(),
            this.createHandleExamSubmissionFunction(),
        ];
    }

    private createGenerateTimeTableFunction() {
        return inngest.createFunction(
            { id: 'Generate-Timetable' },
            { event: 'generate/timetable' },
            async ({ event, step }) => {
                const { classId, academicYearId, settings } = event.data;

                const contextData = await step.run('fetch-class-context', async () => {
                    const classData = await this.classModel.findById(classId).populate('subjects');
                    if (!classData) throw new NonRetriableError('Class not found');

                    // @ts-ignore
                    const classSubjectsIds = classData.subjects.map((sub: any) => sub._id.toString());

                    const allTeachers = await this.userModel.find({ role: 'teacher' });
                    const qualifiedTeachers = allTeachers
                        .filter((teacher) => {
                            if (!teacher.teacherSubject) return false;
                            // @ts-ignore
                            return teacher.teacherSubject.some((subId: any) => classSubjectsIds.includes(subId.toString()));
                        })
                        .map((tea) => ({
                            id: tea._id,
                            name: tea.name,
                            subjects: tea.teacherSubject,
                        }));

                    // @ts-ignore
                    const subjectsPayload = classData.subjects.map((sub: any) => ({
                        id: sub._id,
                        name: sub.name,
                        // @ts-ignore
                        code: sub.code,
                    }));

                    if (subjectsPayload.length === 0 || qualifiedTeachers.length === 0) {
                        throw new NonRetriableError('No Subjects or Teachers assigned to this class');
                    }

                    return {
                        className: classData.name,
                        subjects: subjectsPayload,
                        teachers: qualifiedTeachers,
                    };
                });

                const aiSchedule = await step.run('generate-timetable-logic', async () => {
                    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
                    if (!apiKey) throw new NonRetriableError('GOOGLE_GENERATIVE_AI_API_KEY is missing');

                    const allTimetables = await this.timetableModel.find({ academicYear: academicYearId });

                    const prompt = `
            You are a school scheduler. Generate a weekly timetable (Monday to Friday).
            CONTEXT:
            - Class: ${contextData.className}
            - Hours: ${settings.startTime} to ${settings.endTime} (${settings.periods} periods/day).
            RESOURCES:
            - Subjects: ${JSON.stringify(contextData.subjects)}
            - Teachers: ${JSON.stringify(contextData.teachers)}
            - Other Timetables: ${JSON.stringify(allTimetables)}
            STRICT RULES:
            1. Assign a Teacher to every Subject period.
            2. Teacher MUST have the subject ID in their list.
            3. Break Time (10m) after 2 periods, Lunch (30m) after 5 periods.
            4. Avoid clashes.
            5. Output strict JSON only. Schema:
               { "schedule": [ { "day": "Monday", "periods": [ { "subject": "ID", "teacher": "ID", "startTime": "HH:MM", "endTime": "HH:MM" } ] } ] }
          `;

                    const google = createGoogleGenerativeAI({ apiKey });
                    const { text } = await generateText({
                        prompt,
                        model: google('gemini-1.5-flash'), // Updated model name
                    });

                    const cleanJSON = text.replace(/```json/g, '').replace(/```/g, '');
                    return JSON.parse(cleanJSON);
                });

                await step.run('save-timetable', async () => {
                    await this.timetableModel.findOneAndDelete({ class: classId, academicYear: academicYearId });
                    await this.timetableModel.create({
                        class: classId,
                        academicYear: academicYearId,
                        schedule: aiSchedule.schedule,
                    });
                    return { success: true };
                });

                return { message: 'Timetable generated successfully' };
            },
        );
    }

    private createGenerateExamFunction() {
        return inngest.createFunction(
            { id: 'Generate-Exam' },
            { event: 'exam/generate' },
            async ({ event, step }) => {
                const { examId, topic, subjectName, difficulty, count } = event.data;

                const aiExam = await step.run('generate-exam-logic', async () => {
                    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
                    if (!apiKey) throw new NonRetriableError('API Key missing');

                    const prompt = `
            Create JSON array of ${count} MCQ questions.
            Subject: ${subjectName}, Topic: ${topic}, Difficulty: ${difficulty}.
            Schema: [ { "questionText": "...", "type": "MCQ", "options": ["A","B","C","D"], "correctAnswer": "Exact Option String", "points": 1 } ]
            Output ONLY raw JSON.
          `;

                    const google = createGoogleGenerativeAI({ apiKey });
                    const { text } = await generateText({
                        prompt,
                        model: google('gemini-1.5-flash'),
                    });

                    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
                    return JSON.parse(cleanJson);
                });

                await step.run('save-exam', async () => {
                    const exam = await this.examModel.findById(examId);
                    if (!exam) throw new NonRetriableError('Exam not found');
                    exam.questions = aiExam;
                    exam.isActive = false;
                    await exam.save();
                    return { success: true };
                });

                return { message: 'Exam generated successfully' };
            },
        );
    }

    private createHandleExamSubmissionFunction() {
        return inngest.createFunction(
            { id: 'Handle-Exam-Submission' },
            { event: 'exam/submit' },
            async ({ event, step }) => {
                const { examId, studentId, answers } = event.data;

                await step.run('process-exam-submission', async () => {
                    const existing = await this.submissionModel.findOne({ exam: examId, student: studentId });
                    if (existing) throw new NonRetriableError('Already submitted');

                    // @ts-ignore
                    const exam = await this.examModel.findById(examId); // Assuming questions has correctAnswer
                    if (!exam) throw new NonRetriableError('Exam not found');

                    let score = 0;
                    exam.questions.forEach((q: any) => {
                        const ans = answers.find((a: any) => a.questionId === q._id?.toString() || a.questionText === q.questionText); // Fallback to text matching if no IDs on Qs yet
                        if (ans && ans.answer === q.correctAnswer) {
                            score += q.points;
                        }
                    });

                    await this.submissionModel.create({
                        exam: examId,
                        student: studentId,
                        answers,
                        score,
                    });
                });

                return { message: 'Exam submitted successfully' };
            },
        );
    }
}
