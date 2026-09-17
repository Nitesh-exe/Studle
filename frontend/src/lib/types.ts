// frontend/src/lib/types.ts

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  streak: number;
  level: number;
  points: number;
  semester?: string;
  branch?: string;
};

export type Topic = {
  id: string;
  subject_id?: string;
  title: string;
  description?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  importance?: number;
  mastery_score?: number;
  completed: boolean;
};

export type Subject = {
  id: string;
  name: string;
  code?: string;
  color: string;
  icon?: string;
  progress: number;
  topics?: Topic[];
};

export type StudyTask = {
  id: string;
  title: string;
  subject: string;
  duration: number;
  completed: boolean;
  dueDate?: string;
  priority?: "High" | "Medium" | "Low";
};

export type Exam = {
  id: string;
  title: string;
  subject: string;
  date: string;
  daysLeft?: number;
  progress: number;
  color: string;
  topics?: string;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
};

export type MissionItem = {
  id: string;
  subject: string;
  title: string;
  durationMinutes: number;
  reason: string;
  priorityScore: number;
  completed: boolean;
};

export type Document = {
  id: string;
  title: string;
  file_type: string;
  subject_name?: string;
  chunk_count: number;
  processing_status: "ready" | "processing" | "failed";
  created_at: string;
  summary?: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  subject_id?: string;
  topic_name?: string;
  questions: QuizQuestion[];
};

export type QuantumGate = {
  id: string;
  qubit: number;
  target?: number; // for CNOT
  type: "H" | "X" | "Y" | "Z" | "CX" | "M";
  step: number;
};