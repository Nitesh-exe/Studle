// frontend/src/lib/constants.ts
export const STORAGE_KEYS = {
  user: "studle:user",
  tasks: "studle:tasks",
  subjects: "studle:subjects",
  exams: "studle:exams",
  theme: "studle:theme",
} as const;

export const APP_NAME = "Studle";

export const DEFAULT_USER = {
  id: "user-1",
  name: "Nitesh",
  email: "nitesh@example.com",
  streak: 7,
  level: 4,
  points: 1240,
};

export const NAV_ITEMS = [
  { label: "Overview", icon: "⌂", path: "/" },
  { label: "Study Plan", icon: "🎯", path: "/study-plan" },
  { label: "Subjects", icon: "📚", path: "/subjects" },
  { label: "Tasks & Projects", icon: "✓", path: "/tasks" },
  { label: "Exams", icon: "📅", path: "/exams" },
  { label: "Ask Studle AI", icon: "✨", path: "/ai/ask" },
  { label: "Knowledge Vault", icon: "🗄️", path: "/ai/vault" },
  { label: "Quiz & Mastery", icon: "💡", path: "/ai/quiz" },
  { label: "Analytics", icon: "📊", path: "/analytics" },
  { label: "Quantum Lab", icon: "⚛️", path: "/quantum" },
];