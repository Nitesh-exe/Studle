// frontend/src/pages/ExamsPage.tsx
import { useState, useEffect } from "react";
import { Card, Button, Badge, ProgressBar, Modal, Input } from "../components/ui";

import { api } from "../lib/api";

export default function ExamsPage() {
  const [exams, setExams] = useState<any[]>([
    {
      id: "e-1",
      title: "Mid-Term Examination",
      subject: "Database Management Systems",
      date: "September 22, 2026",
      daysLeft: 5,
      progress: 65,
      color: "#6366f1",
      topics: "Relational Algebra, SQL, Normalization, Query Evaluation",
    },
    {
      id: "e-2",
      title: "Mid-Term Examination",
      subject: "Design & Analysis of Algorithms",
      date: "September 29, 2026",
      daysLeft: 12,
      progress: 48,
      color: "#ec4899",
      topics: "Divide & Conquer, Greedy, Dynamic Programming",
    },
    {
      id: "e-3",
      title: "Semester Practical Lab Exam",
      subject: "Operating Systems",
      date: "October 05, 2026",
      daysLeft: 18,
      progress: 72,
      color: "#10b981",
      topics: "Linux Shell Scripting, Thread Synchronization, Paging",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("DBMS");
  const [newDate, setNewDate] = useState("");
  const [newTopics, setNewTopics] = useState("");

  useEffect(() => {
    async function loadExams() {
      try {
        const data = await api.getExams();
        if (data && data.length > 0) setExams(data);
      } catch (e) {
        // Offline default
      }
    }
    loadExams();
  }, []);

  const handleAddExam = () => {
    if (!newTitle.trim() || !newDate) return;
    const newExam = {
      id: `exam-${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject,
      date: newDate,
      daysLeft: Math.max(1, Math.floor((new Date(newDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
      progress: 10,
      color: "#8b5cf6",
      topics: newTopics || "Full Syllabus",
    };
    setExams([...exams, newExam]);
    setShowAddModal(false);
    setNewTitle("");
    api.createExam(newExam).catch(() => {});
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span className="dashboard-eyebrow">Academic Milestones</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0" }}>Upcoming Examinations</h1>
          <p style={{ color: "var(--color-muted)", margin: 0 }}>
            Track days remaining, test dates, and syllabus readiness scores for every course exam.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)}>+ Schedule Exam</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {exams.map((exam) => (
          <Card key={exam.id} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: exam.color || "#6366f1",
                  }}
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.15rem" }}>{exam.subject}</h3>
                  <small style={{ color: "var(--color-muted)" }}>{exam.title}</small>
                </div>
              </div>

              <Badge tone={exam.daysLeft <= 5 ? "danger" : exam.daysLeft <= 14 ? "warning" : "info"}>
                {exam.daysLeft} days left
              </Badge>
            </div>

            <div style={{ padding: "0.75rem", borderRadius: "8px", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>Scheduled Date</div>
              <strong style={{ fontSize: "1.05rem" }}>{exam.date}</strong>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                <span>Revision Readiness</span>
                <strong>{exam.progress}%</strong>
              </div>
              <ProgressBar value={exam.progress} />
            </div>

            {exam.topics && (
              <div style={{ fontSize: "0.85rem", color: "var(--color-muted)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.75rem" }}>
                <strong>Key Syllabus:</strong> {exam.topics}
              </div>
            )}
          </Card>
        ))}
      </div>

      {showAddModal && (
        <Modal title="Schedule New Exam" isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Input
              label="Exam Name"
              placeholder="e.g. End Semester Exam, Lab Viva"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <Input
              label="Subject"
              placeholder="e.g. Operating Systems"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              required
            />
            <Input
              label="Date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
            <Input
              label="Key Syllabus Topics"
              placeholder="e.g. Units 1, 2, and 3"
              value={newTopics}
              onChange={(e) => setNewTopics(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
              <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={handleAddExam}>Schedule Exam</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
