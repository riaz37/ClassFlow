# ClassFlow

**ClassFlow** is a modern, AI-powered backend for school management, built with [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/). It streamlines academic operations by automating timetable generation and exam creation using generative AI.

## 🚀 Features

-   **Modular Architecture**: Built on a strict NestJS module system.
-   **Authentication**: Secure JWT-based authentication with Role-Based Access Control (RBAC).
-   **Academic Core**: Manage Academic Years, Subjects, Classes, Teachers, and Students.
-   **AI-Powered Automation**:
    -   **Smart Scheduling**: Automatically generates conflict-free/optimized timetables using **Google Gemini**.
    -   **Exam Generation**: Creates unique exams and quizzes based on subject, topic, and difficulty.
-   **Inngest Integration**: Reliable background job processing for heavy AI tasks.
-   **Dashboard & Analytics**: Aggregated insights into school activities.

## 🛠 Tech Stack

-   **Framework**: [NestJS](https://nestjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
-   **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/docs) + Google Gemini
-   **Queue/Jobs**: [Inngest](https://www.inngest.com/)
-   **Auth**: Passport + JWT

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/classflow.git
    cd classflow/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the `backend` root and configure the following:

    ```env
    PORT=5000
    MONGO_URL="mongodb://localhost:27017/classflow"
    CLIENT_URL="http://localhost:5173"
    JWT_SECRET="your-super-secret-key"
    GOOGLE_GENERATIVE_AI_API_KEY="your-google-gemini-api-key"
    ```

## 🏃‍♂️ Running the App

1.  **Start the Backend Server:**
    ```bash
    # Development mode
    npm run start:dev
    ```

2.  **Start Inngest Dev Server (Required for AI features):**
    ```bash
    npx inngest-cli@latest dev
    ```
    Visit `http://localhost:8288` to view the Inngest dashboard.

## 🧪 Testing

-   **Unit Tests**: `npm run test`
-   **E2E Tests**: `npm run test:e2e`

## 📚 API Documentation

The API runs at `http://localhost:5000/api`. Key endpoints include:

-   **Auth**: `POST /api/users/login`, `POST /api/users/register`
-   **Users**: `GET /api/users`, `GET /api/users/profile`
-   **Classes**: `GET /api/classes`, `POST /api/classes`
-   **Inngest Webhook**: `POST /api/inngest` (Handles asynchronous AI tasks)

## 📄 License

This project is [MIT licensed](LICENSE).
