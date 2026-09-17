// frontend/src/lib/api.ts

const API_BASE = "/api/v1";

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[API] Error fetching ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Profile
  getProfile: () => apiFetch<any>("/profile"),
  updateProfile: (data: any) => apiFetch<any>("/profile", { method: "PUT", body: JSON.stringify(data) }),

  // Subjects & Topics
  getSubjects: () => apiFetch<any[]>("/subjects"),
  createSubject: (data: { name: string; code: string; color: string }) =>
    apiFetch<any>("/subjects", { method: "POST", body: JSON.stringify(data) }),
  getSubjectTopics: (subjectId: string) => apiFetch<any[]>(`/subjects/${subjectId}/topics`),
  updateTopicProgress: (topicId: string, completed: boolean) =>
    apiFetch<any>(`/topics/${topicId}/progress`, { method: "POST", body: JSON.stringify({ completed }) }),

  // Tasks
  getTasks: () => apiFetch<any[]>("/tasks"),
  createTask: (data: any) => apiFetch<any>("/tasks", { method: "POST", body: JSON.stringify(data) }),
  updateTask: (taskId: string, data: any) =>
    apiFetch<any>(`/tasks/${taskId}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTask: (taskId: string) => apiFetch<any>(`/tasks/${taskId}`, { method: "DELETE" }),

  // Exams
  getExams: () => apiFetch<any[]>("/exams"),
  createExam: (data: any) => apiFetch<any>("/exams", { method: "POST", body: JSON.stringify(data) }),

  // Mission & Planning
  getTodaysMission: () => apiFetch<any>("/planning/today"),
  generateMission: () => apiFetch<any>("/planning/generate", { method: "POST" }),
  logStudySession: (data: { subject_id?: string; duration_minutes: number; topic_id?: string }) =>
    apiFetch<any>("/planning/sessions", { method: "POST", body: JSON.stringify(data) }),

  // AI & RAG
  askAI: (query: string, subject_id?: string, document_ids?: string[]) =>
    apiFetch<{ answer: string; sources: string[]; follow_ups: string[] }>("/ai/ask", {
      method: "POST",
      body: JSON.stringify({ query, subject_id, document_ids }),
    }),
  analyzeSyllabus: (text: string, subjectName: string) =>
    apiFetch<any>("/ai/analyze-syllabus", {
      method: "POST",
      body: JSON.stringify({ text, subject_name: subjectName }),
    }),
  summarizeDoc: (docId: string) =>
    apiFetch<{ summary: string; key_takeaways: string[] }>(`/ai/summarize`, {
      method: "POST",
      body: JSON.stringify({ document_id: docId }),
    }),

  // Documents
  getDocuments: () => apiFetch<any[]>("/documents"),
  uploadDocument: async (file: File, subject_id?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (subject_id) formData.append("subject_id", subject_id);

    const res = await fetch(`${API_BASE}/documents/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },

  // Quizzes
  generateQuiz: (data: { topic_id?: string; subject_id?: string; num_questions?: number }) =>
    apiFetch<any>("/quizzes/generate", { method: "POST", body: JSON.stringify(data) }),
  submitQuizAttempt: (quiz_id: string, answers: Record<string, number>) =>
    apiFetch<{ score: number; total: number; percentage: number; feedback: string }>(`/quizzes/${quiz_id}/attempt`, {
      method: "POST",
      body: JSON.stringify({ answers }),
    }),

  // Analytics
  getAnalyticsOverview: () => apiFetch<any>("/analytics/overview"),

  // Quantum Lab
  simulateCircuit: (qubits: number, gates: any[]) =>
    apiFetch<{
      statevector: string[];
      probabilities: Record<string, number>;
      shots: Record<string, number>;
      bloch_spheres?: any[];
    }>("/quantum/simulate", {
      method: "POST",
      body: JSON.stringify({ qubits, gates }),
    }),
  explainCircuit: (gates: any[]) =>
    apiFetch<{ explanation: string; principles: string[] }>("/quantum/explain", {
      method: "POST",
      body: JSON.stringify({ gates }),
    }),
};
