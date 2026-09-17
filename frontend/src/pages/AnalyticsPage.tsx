// frontend/src/pages/AnalyticsPage.tsx
import { useState } from "react";
import { Card, Badge } from "../components/ui";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function AnalyticsPage() {
  const [subjectProgress] = useState([
    { subject: "DBMS", progress: 65, target: 100, fill: "#6366f1" },
    { subject: "DAA", progress: 48, target: 100, fill: "#ec4899" },
    { subject: "OS", progress: 72, target: 100, fill: "#10b981" },
    { subject: "Computer Networks", progress: 54, target: 100, fill: "#f59e0b" },
    { subject: "Quantum Comp", progress: 80, target: 100, fill: "#8b5cf6" },
  ]);

  const [weeklyStudyHours] = useState([
    { day: "Mon", hours: 2.5, target: 3 },
    { day: "Tue", hours: 1.5, target: 3 },
    { day: "Wed", hours: 3.8, target: 3 },
    { day: "Thu", hours: 2.2, target: 3 },
    { day: "Fri", hours: 1.8, target: 3 },
    { day: "Sat", hours: 4.5, target: 3 },
    { day: "Sun", hours: 3.0, target: 3 },
  ]);

  const [quizScoreHistory] = useState([
    { test: "Quiz 1 (SQL)", score: 75 },
    { test: "Quiz 2 (Relations)", score: 82 },
    { test: "Quiz 3 (Sorting)", score: 70 },
    { test: "Quiz 4 (DP Knapsack)", score: 88 },
    { test: "Quiz 5 (Process Sync)", score: 92 },
  ]);

  const [attendanceRecords] = useState([
    { subject: "Database Management Systems", held: 24, attended: 22, percentage: 91.6 },
    { subject: "Design & Analysis of Algorithms", held: 26, attended: 23, percentage: 88.4 },
    { subject: "Operating Systems", held: 20, attended: 18, percentage: 90.0 },
    { subject: "Computer Networks Lab", held: 12, attended: 11, percentage: 91.6 },
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <span className="dashboard-eyebrow">Academic Growth & Performance</span>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0" }}>Learning Analytics & Attendance</h1>
        <p style={{ color: "var(--color-muted)", margin: 0 }}>
          Holistic metrics combining curriculum completion, active study hours, quiz mastery trajectories, and classroom attendance.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {/* Subject Progress Bar Chart */}
        <Card style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span className="dashboard-eyebrow">Curriculum Completion</span>
            <h3 style={{ margin: "0.25rem 0 0 0", fontSize: "1.15rem" }}>Subject Mastery (%)</h3>
          </div>
          <div style={{ height: "260px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff" }}
                />
                <Bar dataKey="progress" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Weekly Study Time Line Chart */}
        <Card style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span className="dashboard-eyebrow">Focus Distribution</span>
            <h3 style={{ margin: "0.25rem 0 0 0", fontSize: "1.15rem" }}>Weekly Study Hours</h3>
          </div>
          <div style={{ height: "260px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyStudyHours} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff" }}
                />
                <Line type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Second Row: Quiz Score Trajectory and Attendance Records */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {/* Quiz Scores */}
        <Card style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span className="dashboard-eyebrow">Retention Trend</span>
            <h3 style={{ margin: "0.25rem 0 0 0", fontSize: "1.15rem" }}>Quiz Performance History</h3>
          </div>
          <div style={{ height: "240px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quizScoreHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="test" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff" }}
                />
                <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Classroom Attendance */}
        <Card style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span className="dashboard-eyebrow">Academic Eligibility</span>
            <h3 style={{ margin: "0.25rem 0 0 0", fontSize: "1.15rem" }}>Class Attendance Status</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {attendanceRecords.map((att) => (
              <div
                key={att.subject}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div>
                  <strong>{att.subject}</strong>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
                    {att.attended} / {att.held} lectures attended
                  </div>
                </div>

                <Badge tone={att.percentage >= 85 ? "success" : att.percentage >= 75 ? "warning" : "danger"}>
                  {att.percentage.toFixed(1)}%
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
