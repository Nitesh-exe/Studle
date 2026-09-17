// frontend/src/pages/StudyPlanPage.tsx
import { useState, useEffect } from "react";
import { Card, Button, Badge, ProgressBar } from "../components/ui";

import { api } from "../lib/api";

export default function StudyPlanPage() {
  const [mission, setMission] = useState<any[]>([
    {
      id: "m-1",
      subject: "DBMS",
      title: "Practice SQL Joins & Subqueries",
      durationMinutes: 45,
      reason: "Exam in 5 days (Urgency: 90) + Weak Topic (Mastery: 45%)",
      priorityScore: 88.5,
      completed: false,
    },
    {
      id: "m-2",
      subject: "DAA",
      title: "Revise Dynamic Programming (Knapsack & LCS)",
      durationMinutes: 30,
      reason: "High importance topic + Upcoming midterms",
      priorityScore: 82.0,
      completed: false,
    },
    {
      id: "m-3",
      subject: "OS",
      title: "Process Scheduling Algorithms (Round Robin & SJF)",
      durationMinutes: 30,
      reason: "Assignment due in 2 days",
      priorityScore: 75.0,
      completed: true,
    },
  ]);

  const [generating, setGenerating] = useState(false);

  // Pomodoro timer state
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 min in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [mode, setMode] = useState<"study" | "break">("study");
  const [sessionCount, setSessionCount] = useState(2);

  useEffect(() => {
    async function fetchMission() {
      try {
        const data = await api.getTodaysMission();
        if (data?.items?.length) {
          setMission(data.items);
        }
      } catch (e) {
        // Fallback already initialized
      }
    }
    fetchMission();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      // Switch mode
      if (mode === "study") {
        setSessionCount((c) => c + 1);
        api.logStudySession({ duration_minutes: 25 }).catch(() => {});
        setMode("break");
        setPomodoroTime(5 * 60);
      } else {
        setMode("study");
        setPomodoroTime(25 * 60);
      }
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, pomodoroTime, mode]);

  const toggleMissionItem = (id: string) => {
    setMission((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRegenerateMission = async () => {
    setGenerating(true);
    try {
      const res = await api.generateMission();
      if (res?.items) setMission(res.items);
    } catch {
      // Keep existing
    } finally {
      setGenerating(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const completedCount = mission.filter((m) => m.completed).length;
  const missionProgress = mission.length > 0 ? Math.round((completedCount / mission.length) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <span className="dashboard-eyebrow">Explainable AI Daily Planner</span>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0" }}>Today's Study Plan & Focus</h1>
        <p style={{ color: "var(--color-muted)", margin: 0 }}>
          Prioritized automatically by the explainable Studle scoring engine using exam deadlines, topic weakness, and study time.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {/* Today's Mission Card */}
        <Card style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span className="dashboard-eyebrow">Targeted Learning</span>
              <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Today's Mission</h2>
            </div>
            <Button
              variant="secondary"
              onClick={handleRegenerateMission}
              disabled={generating}
            >
              {generating ? "Recalculating..." : "Recalculate AI Plan"}
            </Button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}>
              {completedCount} of {mission.length} tasks completed
            </span>
            <Badge tone={missionProgress === 100 ? "success" : "info"}>{missionProgress}%</Badge>
          </div>
          <ProgressBar value={missionProgress} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {mission.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleMissionItem(item.id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: "12px",
                  background: item.completed ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
                  cursor: "pointer",
                  opacity: item.completed ? 0.65 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}}
                  style={{ width: "18px", height: "18px", marginTop: "2px", cursor: "pointer" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ textDecoration: item.completed ? "line-through" : "none", fontSize: "1rem" }}>
                      [{item.subject}] {item.title}
                    </strong>
                    <Badge tone="warning">Score: {item.priorityScore}</Badge>
                  </div>
                  <p style={{ margin: "0.35rem 0 0 0", fontSize: "0.85rem", color: "var(--color-muted)" }}>
                    {item.reason}
                  </p>
                  <small style={{ color: "var(--color-primary)", display: "inline-block", marginTop: "0.25rem" }}>
                    ⏱ Estimated: {item.durationMinutes} min
                  </small>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Focus Pomodoro Card */}
        <Card
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "1.25rem",
          }}
        >
          <div>
            <span className="dashboard-eyebrow">Focus Timer</span>
            <h2 style={{ margin: "0.25rem 0", fontSize: "1.25rem" }}>
              {mode === "study" ? "🧠 Focused Study Session" : "☕ Rest & Refresh Break"}
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>
              {mode === "study"
                ? "25 minutes of zero-distraction deep work"
                : "5 minutes to stretch and hydrate"}
            </p>
          </div>

          <div
            style={{
              fontSize: "3.5rem",
              fontWeight: 800,
              letterSpacing: "2px",
              fontVariantNumeric: "tabular-nums",
              color: mode === "study" ? "var(--color-primary, #6366f1)" : "#10b981",
              padding: "1rem 2rem",
              background: "rgba(0,0,0,0.15)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {formatTimer(pomodoroTime)}
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Button
              onClick={() => setTimerRunning(!timerRunning)}
              style={{ minWidth: "120px" }}
            >
              {timerRunning ? "Pause" : "Start Session"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setTimerRunning(false);
                setPomodoroTime(mode === "study" ? 25 * 60 : 5 * 60);
              }}
            >
              Reset
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                const nextMode = mode === "study" ? "break" : "study";
                setMode(nextMode);
                setTimerRunning(false);
                setPomodoroTime(nextMode === "study" ? 25 * 60 : 5 * 60);
              }}
            >
              Switch to {mode === "study" ? "Break" : "Study"}
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "0.85rem",
              color: "var(--color-muted)",
              marginTop: "0.5rem",
            }}
          >
            <span>Completed Today: <strong>{sessionCount} sessions</strong></span>
            <span>•</span>
            <span>Total: <strong>{sessionCount * 25} minutes</strong></span>
          </div>
        </Card>
      </div>
    </div>
  );
}
