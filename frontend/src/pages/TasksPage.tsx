// frontend/src/pages/TasksPage.tsx
import { useState, useEffect } from "react";
import { Card, Button, Badge, Tabs, Modal, Input, ProgressBar } from "../components/ui";

import { api } from "../lib/api";

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [tasks, setTasks] = useState<any[]>([
    { id: "t-1", title: "Complete SQL Joins Assignment 3", subject: "DBMS", duration: 45, completed: false, dueDate: "Tomorrow", priority: "High" },
    { id: "t-2", title: "Implement Dynamic Programming Knapsack in C++", subject: "DAA", duration: 60, completed: false, dueDate: "In 3 days", priority: "High" },
    { id: "t-3", title: "Read Chapter 4: Virtual Memory Management", subject: "OS", duration: 30, completed: true, dueDate: "Yesterday", priority: "Medium" },
    { id: "t-4", title: "Submit Lab Report on Round Robin Simulation", subject: "OS", duration: 40, completed: false, dueDate: "In 5 days", priority: "Low" },
  ]);

  const [projects, setProjects] = useState<any[]>([
    {
      id: "p-1",
      name: "Mini-DBMS Query Parser in Python",
      description: "Custom relational tokenizer, parser, and in-memory table joins engine",
      deadline: "Oct 15, 2026",
      progress: 60,
      milestones: [
        { id: "m-1", title: "SQL Lexer & Tokenizer", completed: true },
        { id: "m-2", title: "AST Expression Evaluator", completed: true },
        { id: "m-3", title: "Nested Loop & Hash Joins", completed: false },
        { id: "m-4", title: "Benchmark performance against SQLite", completed: false },
      ],
    },
    {
      id: "p-2",
      name: "Algorithm Benchmark Visualizer",
      description: "Visual runtime comparison of sorting and graph traversal algorithms",
      deadline: "Nov 02, 2026",
      progress: 35,
      milestones: [
        { id: "m-5", title: "Canvas UI Animation loop", completed: true },
        { id: "m-6", title: "Graph shortest path algorithms (Dijkstra/A*)", completed: false },
        { id: "m-7", title: "Export SVG playback report", completed: false },
      ],
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("DBMS");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [newDueDate, setNewDueDate] = useState("In 2 days");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await api.getTasks();
        if (data && data.length > 0) setTasks(data);
      } catch (e) {
        // Offline default
      }
    }
    loadTasks();
  }, []);

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject,
      duration: 30,
      completed: false,
      dueDate: newDueDate,
      priority: newPriority,
    };
    setTasks([newTask, ...tasks]);
    setNewTitle("");
    setShowAddModal(false);
    api.createTask(newTask).catch(() => {});
  };

  const toggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updated = p.milestones.map((m: any) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const comp = updated.filter((m: any) => m.completed).length;
        return {
          ...p,
          milestones: updated,
          progress: Math.round((comp / updated.length) * 100),
        };
      })
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span className="dashboard-eyebrow">Academic Work & Deliverables</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0" }}>Tasks & Projects</h1>
          <p style={{ color: "var(--color-muted)", margin: 0 }}>
            Keep track of course assignments, lab deadlines, project milestones, and priorities.
          </p>
        </div>

        {activeTab === "tasks" && (
          <Button onClick={() => setShowAddModal(true)}>+ Add Task</Button>
        )}
      </div>

      <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>
        <button
          onClick={() => setActiveTab("tasks")}
          style={{
            background: "none",
            border: "none",
            color: activeTab === "tasks" ? "var(--color-primary, #6366f1)" : "var(--color-muted)",
            fontWeight: activeTab === "tasks" ? 700 : 500,
            fontSize: "1rem",
            cursor: "pointer",
            borderBottom: activeTab === "tasks" ? "2px solid var(--color-primary, #6366f1)" : "none",
            paddingBottom: "0.5rem",
          }}
        >
          Assignments & Tasks ({tasks.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          style={{
            background: "none",
            border: "none",
            color: activeTab === "projects" ? "var(--color-primary, #6366f1)" : "var(--color-muted)",
            fontWeight: activeTab === "projects" ? 700 : 500,
            fontSize: "1rem",
            cursor: "pointer",
            borderBottom: activeTab === "projects" ? "2px solid var(--color-primary, #6366f1)" : "none",
            paddingBottom: "0.5rem",
          }}
        >
          Major Projects ({projects.length})
        </button>
      </div>

      {activeTab === "tasks" ? (
        <Card style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                <div>
                  <strong style={{ textDecoration: task.completed ? "line-through" : "none", fontSize: "1rem" }}>
                    {task.title}
                  </strong>
                  <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>
                    <span>📚 {task.subject}</span>
                    <span>•</span>
                    <span>Due: {task.dueDate}</span>
                    <span>•</span>
                    <span>⏱ {task.duration} min</span>
                  </div>
                </div>
              </div>

              <Badge tone={task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "info"}>
                {task.priority} Priority
              </Badge>
            </div>
          ))}
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {projects.map((proj) => (
            <Card key={proj.id} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.25rem" }}>{proj.name}</h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-muted)" }}>{proj.description}</p>
                </div>
                <Badge tone="info">Deadline: {proj.deadline}</Badge>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span>Project Completion</span>
                  <strong>{proj.progress}%</strong>
                </div>
                <ProgressBar value={proj.progress} />
              </div>

              <div>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-muted)" }}>Key Milestones:</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {proj.milestones.map((m: any) => (
                    <div
                      key={m.id}
                      onClick={() => toggleMilestone(proj.id, m.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.02)",
                        cursor: "pointer",
                      }}
                    >
                      <input type="checkbox" checked={m.completed} onChange={() => {}} />
                      <span style={{ textDecoration: m.completed ? "line-through" : "none", fontSize: "0.9rem" }}>
                        {m.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <Modal title="Add New Task" isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Input
              label="Task Title"
              placeholder="e.g. Complete Dynamic Programming Set"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.85rem", display: "block", marginBottom: "0.25rem" }}>Subject</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                >
                  <option value="DBMS">DBMS</option>
                  <option value="DAA">DAA</option>
                  <option value="OS">OS</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", display: "block", marginBottom: "0.25rem" }}>Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <Input
              label="Due Date"
              placeholder="e.g. Tomorrow, Sep 22"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
              <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={handleAddTask}>Save Task</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
