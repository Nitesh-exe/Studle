// frontend/src/App.tsx
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import StudyPlanPage from "./pages/StudyPlanPage";
import SubjectsPage from "./pages/SubjectsPage";
import TasksPage from "./pages/TasksPage";
import ExamsPage from "./pages/ExamsPage";
import AskAIPage from "./pages/AskAIPage";
import KnowledgeVaultPage from "./pages/KnowledgeVaultPage";
import QuizPage from "./pages/QuizPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import QuantumLabPage from "./pages/QuantumLabPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [activePath, setActivePath] = useState("/");
  const [user] = useState({
    name: "Nitesh",
    streak: 7,
  });

  function renderPage() {
    switch (activePath) {
      case "/":
        return <DashboardPage onNavigate={setActivePath} />;
      case "/study-plan":
        return <StudyPlanPage />;
      case "/subjects":
        return <SubjectsPage />;
      case "/tasks":
        return <TasksPage />;
      case "/exams":
        return <ExamsPage />;
      case "/ai/ask":
        return <AskAIPage />;
      case "/ai/vault":
        return <KnowledgeVaultPage />;
      case "/ai/quiz":
        return <QuizPage />;
      case "/analytics":
        return <AnalyticsPage />;
      case "/quantum":
        return <QuantumLabPage />;
      default:
        return <DashboardPage onNavigate={setActivePath} />;
    }
  }

  function getTitle() {
    switch (activePath) {
      case "/":
        return "Academic Dashboard";
      case "/study-plan":
        return "Today's Study Plan & Focus";
      case "/subjects":
        return "Subjects & Syllabus";
      case "/tasks":
        return "Tasks & Course Projects";
      case "/exams":
        return "Upcoming Exams";
      case "/ai/ask":
        return "Ask Studle AI Tutor";
      case "/ai/vault":
        return "AI Knowledge Vault";
      case "/ai/quiz":
        return "Quiz & Mastery Tracking";
      case "/analytics":
        return "Performance & Analytics";
      case "/quantum":
        return "Quantum Learning Lab";
      default:
        return "Studle Academic Companion";
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout
        activePath={activePath}
        userName={user.name}
        title={getTitle()}
        onNavigate={setActivePath}
        onProfileClick={() => setActivePath("/")}
      >
        {renderPage()}
      </AppLayout>
    </QueryClientProvider>
  );
}