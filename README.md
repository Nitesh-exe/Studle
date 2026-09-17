# Studle
Nikhil, let's design Studle properly from the ground up. 🚀

This should be a real full-stack AI application, not just a dashboard with an AI chat box. We'll build a system where the frontend, backend, database, and AI services work together to understand a student's academic life and turn it into useful actions.

One important thing first: **we'll use pinned dependencies and lockfiles, not blindly install whatever is latest.** A version being newer does not automatically mean it is stable or suitable for your project.

The plan below is a complete architecture and development blueprint. It covers what we're building, how the AI works, the database, project structure, APIs, development phases, and the exact responsibilities of each file.

# Studle

## AI-Powered Academic Companion for Students

**Project Type:** Full-stack AI web application
**Frontend:** React + TypeScript
**Backend:** Python + FastAPI
**Database:** Supabase PostgreSQL
**AI:** Gemini API
**Project Name:** Studle

---

# 1. Project Overview

Studle is an AI-powered academic management and learning platform designed for college students.

It combines academic information, learning resources, tasks, examinations, coding practice, and progress tracking into a single intelligent application.

The system maintains a student profile, understands their syllabus and uploaded resources, tracks their academic progress, and provides personalized study assistance.

### Main problem

Students manage their academic work across disconnected tools:

* Notes and PDFs
* Syllabus
* Assignments
* Examinations
* Timetables
* Coding practice
* Projects
* Study planning

This creates difficulty in prioritizing work, revising effectively, and tracking academic progress.

### Proposed solution

Studle provides:

1. A centralized academic workspace.
2. An AI-powered knowledge vault.
3. A personalized daily study planner.
4. An AI tutor that answers questions from uploaded resources.
5. Quizzes and mastery tracking.
6. Academic, coding, and project progress analytics.
7. An interactive Quantum Learning Lab.

### Important product decision

The Adaptive AI Auto-Rerouting Engine is reserved for the next round.

The current version will include a normal, explainable priority engine and personalized planning. We will not present adaptive auto-rerouting as an implemented feature.

---

# 2. Technology Stack

## 2.1 Frontend

| Technology      | Purpose                                   |
| --------------- | ----------------------------------------- |
| React           | UI components and application interface   |
| TypeScript      | Type-safe development                     |
| Vite            | Frontend development and production build |
| Tailwind CSS    | Styling and responsive design             |
| React Router    | Page navigation                           |
| TanStack Query  | API data fetching and caching             |
| Recharts        | Analytics charts                          |
| Lucide React    | Icons                                     |
| Zod             | Frontend validation                       |
| React Hook Form | Form management                           |

We will use a single React application with a sidebar, dashboard, page-level tabs, and reusable components.

## 2.2 Backend

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Python     | Backend and AI integration      |
| FastAPI    | REST API framework              |
| Pydantic   | Request and response validation |
| SQLAlchemy | Database ORM                    |
| Alembic    | Database migrations             |
| Uvicorn    | Development ASGI server         |
| HTTPX      | Async HTTP requests             |
| Pytest     | Testing                         |

FastAPI will expose the API endpoints consumed by the React frontend. It also provides automatically generated API documentation through OpenAPI. ([Wikipedia][1])

## 2.3 Database and Storage

| Technology                  | Purpose                  |
| --------------------------- | ------------------------ |
| Supabase PostgreSQL         | Main relational database |
| pgvector                    | Vector similarity search |
| Supabase Storage            | PDF and document storage |
| Supabase Auth               | Authentication           |
| Supabase Row Level Security | User data isolation      |

PostgreSQL will store structured data such as students, subjects, tasks, exams, and quiz results.

Vector embeddings will be stored separately from the original document files.

## 2.4 AI and Document Processing

| Technology            | Purpose                               |
| --------------------- | ------------------------------------- |
| Gemini API            | AI responses, planning, summarization |
| Gemini embeddings     | Semantic search                       |
| PyMuPDF               | PDF text extraction                   |
| PostgreSQL + pgvector | Knowledge retrieval                   |
| Qiskit                | Quantum circuit construction          |
| Qiskit Aer            | Quantum simulation                    |

The AI model will not directly access the database. The backend will retrieve relevant data and send only the necessary context to Gemini.

---

# 3. Version Strategy

The following is a proposed pinned baseline for development.

These are dependency choices, not a claim that every version is the newest release available on September 17, 2026. We will verify compatible stable releases before creating the final lockfiles.

## Frontend package.json

```json
{
  "name": "studle-frontend",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "2.57.4",
    "@tanstack/react-query": "5.89.0",
    "lucide-react": "0.468.0",
    "react": "19.1.1",
    "react-dom": "19.1.1",
    "react-hook-form": "7.62.0",
    "react-router-dom": "7.9.1",
    "recharts": "3.2.1",
    "zod": "4.1.5"
  },
  "devDependencies": {
    "@eslint/js": "9.35.0",
    "@types/react": "19.1.12",
    "@types/react-dom": "19.1.9",
    "@vitejs/plugin-react": "5.0.2",
    "autoprefixer": "10.4.21",
    "eslint": "9.35.0",
    "eslint-plugin-react-hooks": "5.2.0",
    "postcss": "8.5.6",
    "tailwindcss": "4.1.13",
    "typescript": "5.9.2",
    "typescript-eslint": "8.43.0",
    "vite": "7.1.5"
  }
}
```

### Notes

* Exact versions will be checked against npm and official documentation.
* We will use a committed `package-lock.json`.
* We will not use `latest` in package.json.
* We will not mix Tailwind CSS v3 and v4 configuration approaches.
* We will use the React version that is compatible with the selected Vite and TypeScript versions.

## Backend requirements.txt

```txt
fastapi==0.136.1
uvicorn[standard]==0.35.0
pydantic==2.11.9
pydantic-settings==2.10.1
sqlalchemy==2.0.43
asyncpg==0.30.0
alembic==1.16.5
httpx==0.28.1
python-multipart==0.0.20
PyMuPDF==1.26.4
google-genai==1.38.0
pgvector==0.4.1
python-dotenv==1.1.1
supabase==2.18.1
qiskit==2.1.1
qiskit-aer==0.17.1
pytest==8.4.2
pytest-asyncio==1.2.0
ruff==0.13.0
```

### Python version

Use:

```txt
Python 3.13
```

Create the backend virtual environment using Python 3.13.

Before installation, we will verify that all selected dependencies support Python 3.13 and that their versions are mutually compatible.

### Important dependency decisions

* Use the current Gemini SDK, not an old `google-generativeai` integration.
* Use SQLAlchemy 2.x.
* Use Pydantic 2.x.
* Use async database access through SQLAlchemy and asyncpg.
* Use the official Qiskit packages.
* Avoid unnecessary AI frameworks in the MVP.

For Gemini model names, we will use a stable model identifier supported by the selected API and account at implementation time. We will not hardcode an old preview model into the application. Google's documentation distinguishes stable model versions from preview versions, so model selection must be verified against the current lifecycle. ([Google Cloud Documentation][2])

---

# 4. Overall System Architecture

```text
                         STUDLE APPLICATION
                                |
                +---------------+---------------+
                |                               |
          React Frontend                   FastAPI Backend
                |                               |
                |                    +----------+----------+
                |                    |          |          |
                |                 Academic     AI       Quantum
                |                 Services   Services    Services
                |                    |          |          |
                |                    |       Gemini     Qiskit
                |                    |          |
                +--------------------+----------+
                                     |
                              Supabase PostgreSQL
                                     |
                         +-----------+-----------+
                         |                       |
                  Supabase Storage          pgvector
                  PDFs / Documents       Semantic Search
```

### How the application works

1. The student logs in.
2. The frontend obtains an authenticated session.
3. The frontend sends requests to FastAPI.
4. FastAPI validates the request and identifies the student.
5. The backend reads or writes data in PostgreSQL.
6. AI-related requests call Gemini through backend services.
7. The frontend displays the result.
8. The student's progress and academic data are saved for future personalization.

---

# 5. Project Directory Structure

```text
studle/
│
├── README.md
├── .gitignore
├── .env.example
├── docker-compose.yml
├── LICENSE
│
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── eslint.config.js
│   ├── index.html
│   │
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       │
│       ├── assets/
│       │
│       ├── components/
│       │   ├── ui/
│       │   ├── layout/
│       │   ├── dashboard/
│       │   ├── academics/
│       │   ├── tasks/
│       │   ├── ai/
│       │   ├── planning/
│       │   ├── analytics/
│       │   └── quantum/
│       │
│       ├── pages/
│       │   ├── LoginPage.tsx
│       │   ├── RegisterPage.tsx
│       │   ├── DashboardPage.tsx
│       │   ├── SubjectsPage.tsx
│       │   ├── TasksPage.tsx
│       │   ├── AskLifeOSPage.tsx
│       │   ├── KnowledgeVaultPage.tsx
│       │   ├── QuizPage.tsx
│       │   ├── PlanningPage.tsx
│       │   ├── AnalyticsPage.tsx
│       │   ├── AttendancePage.tsx
│       │   ├── FacultyMentorPage.tsx
│       │   ├── QuantumLabPage.tsx
│       │   └── ProfilePage.tsx
│       │
│       ├── features/
│       │   ├── auth/
│       │   ├── dashboard/
│       │   ├── academics/
│       │   ├── tasks/
│       │   ├── ai/
│       │   ├── planning/
│       │   ├── quizzes/
│       │   ├── analytics/
│       │   └── quantum/
│       │
│       ├── lib/
│       │   ├── api.ts
│       │   ├── supabase.ts
│       │   ├── queryClient.ts
│       │   └── utils.ts
│       │
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   ├── useSubjects.ts
│       │   ├── useTasks.ts
│       │   └── useDashboard.ts
│       │
│       ├── types/
│       │   ├── api.ts
│       │   ├── academic.ts
│       │   ├── tasks.ts
│       │   └── ai.ts
│       │
│       └── routes/
│           └── AppRoutes.tsx
│
├── backend/
│   ├── requirements.txt
│   ├── pyproject.toml
│   ├── .env.example
│   │
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   │
│   │   ├── api/
│   │   │   ├── router.py
│   │   │   └── v1/
│   │   │       ├── auth.py
│   │   │       ├── profile.py
│   │   │       ├── subjects.py
│   │   │       ├── syllabus.py
│   │   │       ├── documents.py
│   │   │       ├── tasks.py
│   │   │       ├── exams.py
│   │   │       ├── quizzes.py
│   │   │       ├── analytics.py
│   │   │       ├── ai.py
│   │   │       ├── planning.py
│   │   │       ├── quantum.py
│   │   │       └── notifications.py
│   │   │
│   │   ├── core/
│   │   │   ├── security.py
│   │   │   ├── exceptions.py
│   │   │   └── logging.py
│   │   │
│   │   ├── db/
│   │   │   ├── session.py
│   │   │   ├── base.py
│   │   │   └── models/
│   │   │       ├── user.py
│   │   │       ├── subject.py
│   │   │       ├── topic.py
│   │   │       ├── document.py
│   │   │       ├── task.py
│   │   │       ├── exam.py
│   │   │       ├── quiz.py
│   │   │       ├── study_session.py
│   │   │       └── project.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── profile.py
│   │   │   ├── subject.py
│   │   │   ├── task.py
│   │   │   ├── document.py
│   │   │   ├── quiz.py
│   │   │   └── ai.py
│   │   │
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   │   ├── gemini_client.py
│   │   │   │   ├── prompts.py
│   │   │   │   ├── planner.py
│   │   │   │   ├── tutor.py
│   │   │   │   ├── summarizer.py
│   │   │   │   └── quiz_generator.py
│   │   │   │
│   │   │   ├── documents/
│   │   │   │   ├── pdf_extractor.py
│   │   │   │   ├── chunker.py
│   │   │   │   ├── embeddings.py
│   │   │   │   └── retrieval.py
│   │   │   │
│   │   │   ├── priority/
│   │   │   │   ├── scoring.py
│   │   │   │   └── mission_generator.py
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   └── progress_service.py
│   │   │   │
│   │   │   └── quantum/
│   │   │       ├── circuit_service.py
│   │   │       └── simulator.py
│   │   │
│   │   └── tests/
│   │       ├── test_auth.py
│   │       ├── test_subjects.py
│   │       ├── test_tasks.py
│   │       ├── test_priority.py
│   │       ├── test_retrieval.py
│   │       └── test_ai.py
│   │
│   └── migrations/
│
└── docs/
    ├── architecture.md
    ├── api.md
    ├── database-schema.md
    ├── ai-design.md
    └── deployment.md
```

---

# 6. Frontend Responsibilities

## main.tsx

Application entry point.

Responsibilities:

* Mount React.
* Import global CSS.
* Initialize the application.

## App.tsx

Root application component.

Responsibilities:

* Configure providers.
* Initialize React Query.
* Load application routes.
* Manage global layout.

## AppRoutes.tsx

Defines application navigation.

Example routes:

```text
/login
/register
/dashboard
/academics/subjects
/academics/tasks
/ai/ask
/ai/vault
/ai/quiz
/planning
/analytics
/quantum
/profile
```

## api.ts

Centralized HTTP client.

Responsibilities:

* Set backend base URL.
* Attach authentication token.
* Send GET, POST, PUT, PATCH, DELETE requests.
* Handle API errors.

Example:

```ts
export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${path}`,
    options
  );

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
```

The actual implementation will include proper token handling, typed errors, and request cancellation.

## supabase.ts

Initializes the Supabase client.

Used for:

* Authentication.
* Session management.
* File uploads.

The Supabase frontend key is not a database password. Sensitive credentials must remain in the backend environment.

## Layout components

### Sidebar

Main navigation:

* Dashboard
* Academics
* AI Study Hub
* Planning & Focus
* Performance & Reports

The dropdowns are collapsed by default.

### Header

Contains:

* Page title.
* Search.
* Notification bell.
* User profile menu.

Notifications will not appear as a separate sidebar item.

### UI components

Reusable components:

* Button
* Input
* Modal
* Dialog
* Dropdown
* Tabs
* Badge
* Card
* Progress bar
* Toast
* Skeleton loader

---

# 7. Main Application Pages

## Dashboard

The central page of Studle.

Displays:

* Welcome message.
* Today's Mission.
* Upcoming exams.
* Pending assignments.
* Subject progress.
* Study streak.
* Quick actions.
* Recent AI activity.

### Example dashboard

```text
Good morning, Nikhil

Today's Mission
--------------------------------
DBMS — SQL Joins              45 min
DAA — Dynamic Programming     30 min
OS — Process Scheduling       30 min

Upcoming Exams
--------------------------------
DBMS              5 days left
DAA               12 days left

Academic Progress
--------------------------------
DBMS              65%
DAA               48%
OS                72%
```

The dashboard should use real database data, not hardcoded mock values in the final application.

## Academics

### Subjects & Syllabus

Features:

* Create subjects.
* Upload syllabus.
* View units.
* View topics.
* Mark topic progress.
* Identify weak topics.

### Tasks & Projects

One page with two tabs:

```text
Tasks | Projects
```

Tasks include:

* Assignments.
* Deadlines.
* Priority.
* Status.

Projects include:

* Milestones.
* Tasks.
* Completion percentage.
* Project deadlines.

## AI Study Hub

### Ask Studle AI

AI tutor with context from:

* Student profile.
* Selected subject.
* Uploaded notes.
* Syllabus.
* Relevant topics.

### AI Knowledge Vault

Features:

* Upload PDFs.
* View documents.
* Search notes.
* Open document details.
* Generate revision notes.
* Ask questions about a document.

### Smart Flashcards

Generate flashcards from selected topics or documents.

### Quiz & Mastery

Features:

* Generate quiz.
* Attempt quiz.
* Save answers.
* Calculate score.
* Track topic mastery.

## Planning & Focus

### Calendar & Exams

Combined page with tabs:

```text
Calendar | Exam Planner
```

Calendar shows:

* Exams.
* Assignments.
* Project deadlines.
* Study sessions.

Exam Planner generates a plan using:

* Exam date.
* Remaining topics.
* Weak topics.
* Available time.

### Goal Tracker

Example:

```text
Complete DSA in 30 days
```

Tracks:

* Goal deadline.
* Milestones.
* Progress.
* Completion status.

### Focus Pomodoro

Tracks focused study sessions.

Example:

```text
25 minutes study
5 minutes break
```

The timer should be implemented in the frontend. The backend stores completed sessions.

## Performance & Reports

### Academic Analytics

Charts for:

* Subject progress.
* Study time.
* Quiz scores.
* Completed tasks.
* Topic mastery.

### Attendance & Achievements

Combined page with:

* Subject attendance.
* Attendance percentage.
* Study streaks.
* Achievement milestones.

### Faculty / Mentor View

Optional feature.

Allows a student to share selected academic progress with a mentor.

The first version should use explicit sharing permissions rather than giving faculty access to every student.

### Export Reports

Generate downloadable reports of:

* Academic progress.
* Study time.
* Quiz performance.
* Completed tasks.

---

# 8. Database Design

The database will be relational.

## profiles

```text
id
full_name
semester
branch
college
study_goal
created_at
updated_at
```

## subjects

```text
id
user_id
name
code
semester
importance
created_at
```

## topics

```text
id
subject_id
parent_id
name
description
importance
mastery_score
status
```

The `parent_id` allows nested topics and subtopics.

## documents

```text
id
user_id
subject_id
title
file_path
file_type
processing_status
created_at
```

## document_chunks

```text
id
document_id
content
embedding
page_number
chunk_index
```

The embedding column uses the pgvector type.

## tasks

```text
id
user_id
subject_id
title
description
due_date
priority
status
created_at
```

## exams

```text
id
user_id
subject_id
exam_date
exam_type
status
```

## quizzes

```text
id
user_id
subject_id
topic_id
title
created_at
```

## quiz_questions

```text
id
quiz_id
question
question_type
options
correct_answer
explanation
```

## quiz_attempts

```text
id
quiz_id
user_id
score
completed_at
```

## study_sessions

```text
id
user_id
subject_id
topic_id
duration_minutes
started_at
ended_at
```

## projects

```text
id
user_id
name
description
deadline
status
progress
```

## project_milestones

```text
id
project_id
title
due_date
status
```

## attendance_records

```text
id
user_id
subject_id
classes_held
classes_attended
updated_at
```

---

# 9. AI Architecture

This is the most important technical part.

Studle will use Gemini through backend services.

We will not put the Gemini API key in React.

```text
React
  |
  | POST /api/v1/ai/ask
  |
FastAPI
  |
  +-- Authenticate student
  |
  +-- Retrieve relevant academic context
  |
  +-- Retrieve relevant document chunks
  |
  +-- Construct prompt
  |
  +-- Call Gemini
  |
  +-- Validate response
  |
  +-- Return answer
  |
React
```

## 9.1 Gemini client

File:

```text
backend/app/services/ai/gemini_client.py
```

Responsibilities:

* Initialize Gemini client.
* Read API key from environment.
* Send prompts.
* Configure generation settings.
* Handle API errors.
* Enforce token limits.
* Return structured results.

The AI client should be isolated from API route files so we can change the model without rewriting the entire backend.

## 9.2 Prompt management

File:

```text
backend/app/services/ai/prompts.py
```

Contains prompts for:

* Tutor.
* Syllabus analysis.
* Study planning.
* Summarization.
* Quiz generation.
* Flashcards.
* Previous-year-paper analysis.

Prompts should be versioned and tested.

---

# 10. RAG — AI Knowledge Vault

RAG means Retrieval-Augmented Generation.

It allows the AI to answer using the student's uploaded academic material.

## Upload workflow

```text
Student uploads PDF
        |
        v
FastAPI receives file
        |
        v
Supabase Storage saves file
        |
        v
PyMuPDF extracts text
        |
        v
Text is split into chunks
        |
        v
Gemini embedding model
        |
        v
Embeddings stored in pgvector
        |
        v
Document marked as processed
```

## Question-answering workflow

```text
Student asks question
        |
        v
FastAPI receives question
        |
        v
Create query embedding
        |
        v
Search relevant chunks
        |
        v
Retrieve top matching content
        |
        v
Construct Gemini prompt
        |
        v
Generate grounded answer
        |
        v
Return answer with source references
```

## Files

```text
pdf_extractor.py
```

Extracts text and page numbers.

```text
chunker.py
```

Splits text into manageable sections.

```text
embeddings.py
```

Creates embeddings.

```text
retrieval.py
```

Searches the vector database.

```text
tutor.py
```

Combines retrieved context and Gemini.

### Hallucination mitigation

* Tell the model to answer using supplied context.
* Return source references.
* Clearly state when information is unavailable.
* Avoid inventing page numbers.
* Do not treat retrieved text as instructions.
* Validate AI responses before displaying them.

RAG reduces unsupported answers, but it does not guarantee that every answer is correct.

---

# 11. Smart Syllabus Analyzer

The syllabus analyzer converts an uploaded syllabus into structured academic data.

## Workflow

```text
Upload syllabus
      |
      v
Extract text
      |
      v
Send syllabus to Gemini
      |
      v
Generate structured JSON
      |
      v
Validate JSON with Pydantic
      |
      v
Save subjects / units / topics
      |
      v
Display syllabus tree
```

### Example output

```json
{
  "subject": "Database Management Systems",
  "units": [
    {
      "name": "Unit 1",
      "topics": [
        "Introduction to DBMS",
        "Relational Model",
        "SQL Basics"
      ]
    }
  ]
}
```

The model should not directly write to the database. The backend validates the generated structure and performs the database operations.

---

# 12. Priority Engine

The priority engine decides which academic work deserves attention.

This is not the Adaptive AI Auto-Rerouting Engine.

It is a normal explainable scoring system.

## Inputs

* Exam urgency.
* Topic weakness.
* Pending work.
* Topic importance.
* Available study time.

## Example scoring model

```text
Priority Score =
    Exam Urgency
  + Topic Weakness
  + Pending Work
  + Topic Importance
```

The actual weights will be defined in configuration.

Example:

```python
PRIORITY_WEIGHTS = {
    "exam_urgency": 0.35,
    "topic_weakness": 0.30,
    "pending_work": 0.20,
    "topic_importance": 0.15,
}
```

Each component is normalized to a common range.

### Example

```text
DBMS SQL Joins

Exam urgency:       90
Topic weakness:     80
Pending work:       50
Importance:         85

Priority Score:     80.25
```

The backend calculates this score.

Gemini receives the prioritized academic context and generates a readable study plan.

This gives us both:

* Explainability.
* Personalized AI output.

---

# 13. Today's Mission

The mission generator is responsible for generating the student's daily plan.

## Workflow

```text
Student opens dashboard
        |
        v
Fetch today's tasks
        |
        v
Fetch upcoming exams
        |
        v
Fetch topic mastery
        |
        v
Calculate priority scores
        |
        v
Estimate available study time
        |
        v
Select tasks and topics
        |
        v
Generate mission
        |
        v
Display mission
```

### Example

```text
Today's Mission

1. DBMS — Practice SQL Joins
   45 minutes

2. DAA — Revise Dynamic Programming
   30 minutes

3. OS — Process Scheduling
   30 minutes
```

The mission should be stored so that the student can mark items completed.

---

# 14. Quiz Generator

The quiz generator creates questions from:

* Topics.
* Uploaded notes.
* Syllabus.
* Selected documents.

Supported question types:

* MCQ.
* True/False.
* Short Answer.

## Workflow

```text
Student selects topic
        |
        v
Backend retrieves topic content
        |
        v
Gemini generates structured quiz
        |
        v
Pydantic validates output
        |
        v
Save quiz questions
        |
        v
Frontend displays quiz
```

### Mastery tracking

After a quiz attempt:

```text
Score
  |
  v
Topic mastery update
  |
  v
Weak topic detection
  |
  v
Analytics update
```

We will begin with score-based mastery. More sophisticated learning models can be introduced later.

---

# 15. Quantum Learning Lab

The Quantum Learning Lab is a separate module.

It should not interfere with the main academic system.

## Features

* Quantum circuit builder.
* Quantum gate selection.
* Circuit visualization.
* Qiskit code generation.
* Quantum simulation.
* AI explanations.

## Example gates

* H.
* X.
* Y.
* Z.
* CNOT.
* Measurement.

## Workflow

```text
Student selects quantum gates
        |
        v
Frontend creates circuit definition
        |
        v
FastAPI receives circuit
        |
        v
Qiskit builds circuit
        |
        v
Qiskit Aer simulates circuit
        |
        v
Return results
        |
        v
Frontend displays visualization
```

The frontend can initially display a circuit using a custom React visualization.

The backend will handle circuit construction and simulation.

---

# 16. API Structure

All endpoints will use a versioned prefix:

```text
/api/v1
```

## Authentication

```text
GET    /auth/me
POST   /auth/logout
```

Supabase Auth handles registration and login.

## Profile

```text
GET    /profile
PUT    /profile
```

## Subjects

```text
GET    /subjects
POST   /subjects
GET    /subjects/{subject_id}
PUT    /subjects/{subject_id}
DELETE /subjects/{subject_id}
```

## Syllabus

```text
POST   /syllabus/upload
GET    /subjects/{subject_id}/topics
POST   /topics/{topic_id}/progress
```

## Documents

```text
POST   /documents/upload
GET    /documents
GET    /documents/{document_id}
DELETE /documents/{document_id}
POST   /documents/{document_id}/process
```

## AI

```text
POST   /ai/ask
POST   /ai/summarize
POST   /ai/generate-quiz
POST   /ai/generate-flashcards
POST   /ai/analyze-syllabus
```

## Planning

```text
GET    /planning/today
POST   /planning/generate
GET    /planning/exams
POST   /planning/exams
```

## Tasks

```text
GET    /tasks
POST   /tasks
PUT    /tasks/{task_id}
DELETE /tasks/{task_id}
```

## Analytics

```text
GET    /analytics/overview
GET    /analytics/subjects
GET    /analytics/study-time
GET    /analytics/quiz-performance
```

## Quantum

```text
POST   /quantum/simulate
POST   /quantum/explain
```

---

# 17. Security

Security is necessary because Studle stores personal academic information.

## Authentication

Use Supabase Auth.

The frontend obtains the user's session. The backend verifies the access token and identifies the user.

## Authorization

Every database query involving student-owned data must be scoped to the authenticated user.

Example:

```python
query = select(Task).where(
    Task.user_id == current_user.id
)
```

A user must not be able to retrieve another student's tasks by changing an ID in the URL.

## File security

* Validate file type.
* Restrict file size.
* Store files in private buckets.
* Use signed URLs where necessary.
* Do not expose raw file paths publicly.

## AI security

* Never expose API keys in frontend code.
* Validate model output.
* Limit document context size.
* Treat uploaded document text as untrusted input.
* Do not let document text override system instructions.

---

# 18. Development Phases

## Phase 1 — Project Setup

Create:

```text
studle/
frontend/
backend/
docs/
```

Tasks:

* Initialize React + Vite.
* Initialize FastAPI.
* Configure TypeScript.
* Configure Python environment.
* Configure Supabase.
* Create environment files.
* Establish Git repository.

Deliverable:

A working frontend and backend connected through a basic API.

## Phase 2 — Database and Authentication

Implement:

* Supabase Auth.
* Profile creation.
* Database schema.
* Subject CRUD.
* Task CRUD.
* Database migrations.

Deliverable:

A student can register, log in, create subjects, and manage tasks.

## Phase 3 — Dashboard

Implement:

* Application layout.
* Sidebar.
* Header.
* Dashboard cards.
* Upcoming exams.
* Pending tasks.
* Progress charts.

Deliverable:

A functional academic dashboard.

## Phase 4 — Knowledge Vault

Implement:

* PDF upload.
* Storage integration.
* Text extraction.
* Chunking.
* Embeddings.
* pgvector search.

Deliverable:

A student can upload notes and search them semantically.

## Phase 5 — Ask Studle AI

Implement:

* Gemini client.
* RAG retrieval.
* AI tutor.
* Prompt management.
* Source references.
* AI error handling.

Deliverable:

The student can ask questions about their uploaded notes.

## Phase 6 — Syllabus Analyzer

Implement:

* Syllabus upload.
* Text extraction.
* Gemini structured output.
* Topic validation.
* Database insertion.
* Syllabus tree UI.

Deliverable:

A syllabus is converted into units and topics.

## Phase 7 — Priority Engine

Implement:

* Exam urgency calculation.
* Topic weakness calculation.
* Pending task priority.
* Available study time.
* Daily mission generation.

Deliverable:

Studle can generate a personalized daily study plan.

## Phase 8 — Quizzes and Mastery

Implement:

* Quiz generation.
* Quiz attempt UI.
* Score calculation.
* Mastery tracking.
* Weak topic detection.

Deliverable:

The student can practice and track understanding.

## Phase 9 — Analytics and Reports

Implement:

* Subject progress.
* Study time.
* Quiz performance.
* Attendance.
* Study streaks.
* Weekly report.

Deliverable:

A meaningful academic analytics dashboard.

## Phase 10 — Quantum Learning Lab

Implement:

* Circuit builder.
* Gate selection.
* Qiskit simulation.
* Circuit visualization.
* AI code explanation.

Deliverable:

A functional interactive quantum learning module.

## Phase 11 — Testing and Deployment

Implement:

* Backend tests.
* Frontend tests.
* API integration tests.
* Authentication tests.
* Security checks.
* Production build.
* Deployment.

Deliverable:

A deployable Studle MVP.

---

# 19. Team Responsibilities

For a six-member team, divide work by modules rather than having everyone edit the same files.

## Member 1 — Frontend Lead

Responsible for:

* React setup.
* Layout.
* Routing.
* Reusable components.
* Dashboard.

## Member 2 — Backend Lead

Responsible for:

* FastAPI.
* Database models.
* API endpoints.
* Authentication integration.

## Member 3 — AI Lead

Responsible for:

* Gemini integration.
* RAG.
* Embeddings.
* AI prompts.
* Syllabus analyzer.

## Member 4 — Academic Features

Responsible for:

* Subjects.
* Syllabus.
* Tasks.
* Exams.
* Priority engine.

## Member 5 — Learning and Analytics

Responsible for:

* Quizzes.
* Mastery.
* Study timer.
* Analytics.
* Reports.

## Member 6 — Quantum and Integration

Responsible for:

* Qiskit.
* Quantum Learning Lab.
* Integration testing.
* Deployment support.
* Documentation.

Everyone should understand the complete system architecture, even if they own only one module.

---

# 20. Git Workflow

Use feature branches.

```text
main
  |
  +-- develop
        |
        +-- feature/frontend-dashboard
        +-- feature/backend-auth
        +-- feature/ai-rag
        +-- feature/quiz-system
        +-- feature/quantum-lab
```

### Commit examples

```text
feat: add subject management API
feat: implement PDF upload
feat: add Gemini tutor service
fix: validate quiz response schema
docs: update database architecture
```

### Rules

* Do not commit `.env`.
* Do not commit API keys.
* Do not push directly to main.
* Review pull requests.
* Keep commits focused.
* Run tests before merging.

---

# 21. Environment Variables

## Backend

```env
APP_ENV=development

DATABASE_URL=postgresql+asyncpg://...

SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

GEMINI_API_KEY=...
GEMINI_MODEL=...

CORS_ORIGINS=http://localhost:5173
```

The service role key must remain backend-only.

## Frontend

```env
VITE_API_URL=http://localhost:8000/api/v1

VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Only variables intended for frontend use should use the `VITE_` prefix.

---

# 22. Docker Development

We can use Docker Compose for local development.

```text
docker-compose.yml
```

Initial services:

```text
backend
frontend
```

The database can remain hosted on Supabase.

This is simpler than running a separate local PostgreSQL container while the team is developing.

For a fully local setup later, we can add PostgreSQL with pgvector.

---

# 23. Testing Strategy

## Backend

Test:

* Authentication.
* Subject CRUD.
* Task CRUD.
* Priority scoring.
* Document processing.
* Retrieval.
* AI response validation.

## Frontend

Test:

* Login.
* Dashboard rendering.
* Task creation.
* Quiz interaction.
* API loading states.
* Error states.

## AI evaluation

Create a small test dataset containing:

* Sample syllabus.
* Sample notes.
* Sample questions.
* Expected source references.

Evaluate:

* Whether the answer uses the notes.
* Whether it cites relevant sources.
* Whether it refuses unsupported questions.
* Whether generated quizzes are valid.
* Whether the planner respects available study time.

---

# 24. Deployment Plan

## Frontend

Deploy the React application to a frontend hosting platform.

## Backend

Deploy FastAPI to a Python-compatible hosting platform.

## Database

Use Supabase PostgreSQL.

## Storage

Use Supabase Storage.

## AI

Use Gemini API through the backend.

## Production requirements

* Production environment variables.
* CORS configuration.
* Database migrations.
* Error logging.
* API rate limits.
* Secure authentication.
* File upload limits.
* Health-check endpoint.

---

# 25. Final MVP Definition

The first complete version of Studle should demonstrate this end-to-end workflow:

```text
Student registers
      |
      v
Creates academic profile
      |
      v
Uploads syllabus
      |
      v
Syllabus is converted into topics
      |
      v
Uploads study notes
      |
      v
Notes are indexed
      |
      v
Student asks AI a question
      |
      v
AI answers using notes
      |
      v
Student attempts a quiz
      |
      v
Mastery score updates
      |
      v
Priority engine identifies important work
      |
      v
Today's Mission is generated
      |
      v
Dashboard displays progress
```

This is the core Studle experience.

---

# 26. What We Will Not Build Initially

To keep the project achievable, these features will be deferred:

* Adaptive AI Auto-Rerouting Engine.
* Full institutional SaaS.
* Complex faculty permissions.
* Real-time peer study rooms.
* Offline-first synchronization.
* Advanced predictive learning models.
* Multiple AI providers with automatic failover.
* Full calendar synchronization with external services.

They can be added after the core workflow is stable.

---

# 27. Final Technical Direction

Studle will be built as a modular monolithic application.

That means:

* One React frontend.
* One FastAPI backend.
* One PostgreSQL database.
* Separate backend services for AI, documents, priority scoring, analytics, and quantum computing.

This gives us a clean architecture without the operational complexity of multiple microservices.

The AI system will use:

```text
Gemini API
    +
RAG
    +
Student Academic Data
    +
Priority Engine
    +
Learning Analytics
```

The result is a student-focused AI platform that can understand academic resources, generate useful study assistance, and help students decide what to work on next.

## A few important corrections before we start coding

**1. The package versions above are a proposed baseline, not verified final versions.** My web lookup did not establish a complete, reliable September 2026 compatibility matrix. We'll need to verify the actual stable releases and their peer dependencies before generating the final `package.json` and `requirements.txt`.

**2. Supabase Auth and FastAPI authentication need a clear design.** The frontend will use Supabase Auth, but the backend must verify the user's access token. We should not simply trust a `user_id` sent from React.

**3. We don't need LangChain for the first version.** Direct Gemini API calls, PyMuPDF, embeddings, and pgvector are enough. Adding another orchestration framework would increase the amount of code without giving us an essential feature.

**4. The AI planner and priority engine should be separate.** The backend calculates priority scores; Gemini turns the result into a readable plan. This is easier to test and defend than allowing the LLM to make every decision.

### Next step

Before we start creating the actual files, we should finalize the **database schema and exact dependency versions**. Once those are fixed, we can generate the real project scaffold and start implementing it module by module.

[1]: https://en.wikipedia.org/wiki/FastAPI?utm_source=chatgpt.com "FastAPI"
[2]: https://docs.cloud.google.com/vertex-ai/docs/release-notes?utm_source=chatgpt.com "Vertex AI release notes"
