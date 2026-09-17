// frontend/src/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import {
  WelcomeBanner,
  TodayProgress,
  FocusCard,
  UpcomingExams,
  StatsGrid,
  StudyGoalCard,
  WeeklyActivity,
  QuickActions,
  DashboardGrid,
  RecentActivity,
} from "../components/dashboard";
import { api } from "../lib/api";

type DashboardPageProps = {
  onNavigate: (path: string) => void;
};

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: "Nitesh", streak: 7 });
  const [todayProgress, setTodayProgress] = useState({
    completed: 4,
    total: 6,
    minutesStudied: 85,
    targetMinutes: 120,
  });
  const [focusTask, setFocusTask] = useState({
    subject: "DBMS",
    topic: "B+ Tree Indexing & Query Plans",
    duration: 35,
  });
  const [exams, setExams] = useState<any[]>([
    { id: "1", subject: "Database Management Systems", date: "Sep 22, 2026", daysLeft: 5, topics: "Normalization, SQL, Transactions" },
    { id: "2", subject: "Design & Analysis of Algorithms", date: "Sep 29, 2026", daysLeft: 12, topics: "Dynamic Programming, Greedy" },
    { id: "3", subject: "Operating Systems", date: "Oct 05, 2026", daysLeft: 18, topics: "Virtual Memory, Process Scheduling" },
  ]);
  const [recentActivities] = useState<any[]>([
    { id: "1", title: "Completed Quiz", description: "DBMS SQL Joins (Score: 90%)", time: "1 hour ago", icon: "💡" },
    { id: "2", title: "Focused Study Session", description: "DAA Dynamic Programming (45 mins)", time: "3 hours ago", icon: "⏱" },
    { id: "3", title: "Uploaded Document", description: "OS-Unit-3-Virtual-Memory.pdf", time: "Yesterday", icon: "📄" },
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, examsData, missionData] = await Promise.allSettled([
          api.getProfile(),
          api.getExams(),
          api.getTodaysMission(),
        ]);

        if (profData.status === "fulfilled" && profData.value) {
          setProfile(profData.value);
        }
        if (examsData.status === "fulfilled" && Array.isArray(examsData.value)) {
          setExams(examsData.value);
        }
        if (missionData.status === "fulfilled" && missionData.value?.items?.length) {
          const first = missionData.value.items[0];
          setFocusTask({
            subject: first.subject,
            topic: first.title,
            duration: first.durationMinutes || 30,
          });
        }
      } catch (err) {
        console.warn("Using offline dashboard fallback data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const stats = [
    { label: "Study Streak", value: `${profile.streak} Days`, detail: "Best: 14 days", icon: "🔥", tone: "orange" as const },
    { label: "Overall Progress", value: "68%", detail: "+4% this week", icon: "📈", tone: "blue" as const },
    { label: "Pending Tasks", value: 3, detail: "1 due today", icon: "📋", tone: "purple" as const },
    { label: "Mastery Index", value: "82/100", detail: "High retention", icon: "⭐", tone: "green" as const },
  ];

  const weeklyItems = [
    { day: "Mon", minutes: 90 },
    { day: "Tue", minutes: 60 },
    { day: "Wed", minutes: 110 },
    { day: "Thu", minutes: 85 },
    { day: "Fri", minutes: 45 },
    { day: "Sat", minutes: 120 },
    { day: "Sun", minutes: 75 },
  ];

  const quickActions = [
    {
      label: "Ask Studle AI",
      description: "Ask questions on your notes & syllabus",
      icon: "✨",
      onClick: () => onNavigate("/ai/ask"),
    },
    {
      label: "Generate Practice Quiz",
      description: "Test your retention and boost mastery",
      icon: "💡",
      onClick: () => onNavigate("/ai/quiz"),
    },
    {
      label: "Start Focus Session",
      description: "Launch 25-minute Pomodoro study sprint",
      icon: "⏱️",
      onClick: () => onNavigate("/study-plan"),
    },
    {
      label: "Upload Notes to Vault",
      description: "Index PDFs for AI-assisted studying",
      icon: "🗄️",
      onClick: () => onNavigate("/ai/vault"),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <WelcomeBanner
        name={profile.name}
        streak={profile.streak}
        onStartStudy={() => onNavigate("/study-plan")}
      />

      <StatsGrid stats={stats} />

      <DashboardGrid columns={2}>
        <TodayProgress
          completed={todayProgress.completed}
          total={todayProgress.total}
          minutesStudied={todayProgress.minutesStudied}
          targetMinutes={todayProgress.targetMinutes}
        />

        <FocusCard
          subject={focusTask.subject}
          topic={focusTask.topic}
          duration={focusTask.duration}
          onStart={() => onNavigate("/study-plan")}
        />
      </DashboardGrid>

      <DashboardGrid columns={2}>
        <UpcomingExams
          exams={exams}
          onViewAll={() => onNavigate("/exams")}
        />

        <WeeklyActivity items={weeklyItems} goal={90} />
      </DashboardGrid>

      <DashboardGrid columns={2}>
        <StudyGoalCard
          title="Master Core Computer Science"
          description="Targeting 80%+ mastery across DBMS, OS, and DAA before midterms"
          completed={18}
          target={24}
          unit="topics"
          icon="🎓"
        />

        <QuickActions actions={quickActions} />
      </DashboardGrid>

      <RecentActivity activities={recentActivities} />
    </div>
  );
}

