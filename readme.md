# ClassFlow

**ClassFlow** (formerly Edunexus) is an AI-powered school management system designed to streamline academic operations. It features automated timetable generation, AI-assisted exam creation, and comprehensive role-based dashboards for Admins, Teachers, and Students.

## 🏗 Architecture

The project is structured as a monorepo containing:

-   **`backend`**: robust REST API built with **NestJS** and **MongoDB**. Handles authentication, data management, and AI integrations via **Inngest** & **Google Gemini**.
-   **`frontend`**: A modern, responsive UI built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**.

## ✨ Key Features

-   **🤖 AI Automation**:
    -   **Smart Timetables**: Generates conflict-free class schedules using Google Gemini.
    -   **Exam Creator**: Instantly creates quizzes and exams based on topics and difficulty.
-   **🔐 Role-Based Access**:
    -   **Admin**: Manage users, academic years, and system configuration.
    -   **Teacher**: View schedules, manage classes, and grade exams.
    -   **Student**: View personal timetables and take exams.
-   **⚡ Real-time & Background Processing**: Powered by Inngest for reliable AI task execution.

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18+)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas)
-   [Inngest CLI](https://www.inngest.com/docs/local-dashboard) (Optional, for AI features)

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment:
    Create a `.env` file based on `.env.example` (or use defaults):
    ```env
    PORT=5000
    MONGO_URL="mongodb://localhost:27017/classflow"
    CLIENT_URL="http://localhost:5173"
    JWT_SECRET="your-secret-key"
    GOOGLE_GENERATIVE_AI_API_KEY="your-google-key"
    ```
4.  Start the Server:
    ```bash
    npm run start:dev
    ```
    *Server runs on `http://localhost:5000`*

5.  (Optional) Start Inngest for AI features:
    ```bash
    npx inngest-cli@latest dev
    ```

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Development Server:
    ```bash
    npm run dev
    ```
    *App runs on `http://localhost:5173`*

## 📚 Documentation

-   **Backend Specs**: See `backend/README.md` for detailed API and module documentation.
-   **Migration Notes**: This project was migrated from Express to NestJS to improve scalability and maintainability.

## 📄 License

This project is licensed under the MIT License.
