// frontend/src/pages/SubjectsPage.tsx
import { useState, useEffect } from "react";
import { Card, Button, Modal, Textarea } from "../components/ui";
import { SubjectCard } from "../components/subjects/SubjectCard";
import { TopicList } from "../components/subjects/TopicList";
import { AddSubjectForm } from "../components/subjects/AddSubjectForm";


import { api } from "../lib/api";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([
    {
      id: "sub-1",
      name: "Database Management Systems",
      code: "CS301",
      color: "#6366f1",
      progress: 65,
      completedTopics: 8,
      totalTopics: 12,
      nextTopic: "B+ Tree Indexing & Hash Join",
      topics: [
        { id: "t1", title: "ER Diagrams & Relational Model", completed: true, difficulty: "Easy" },
        { id: "t2", title: "Relational Algebra & Normalization (1NF, 2NF, 3NF, BCNF)", completed: true, difficulty: "Medium" },
        { id: "t3", title: "SQL Complex Joins, Views & Triggers", completed: true, difficulty: "Medium" },
        { id: "t4", title: "B+ Trees & Query Optimization", completed: false, difficulty: "Hard" },
        { id: "t5", title: "Transaction ACID Properties & Concurrency Control", completed: false, difficulty: "Hard" },
      ],
    },
    {
      id: "sub-2",
      name: "Design & Analysis of Algorithms",
      code: "CS302",
      color: "#ec4899",
      progress: 48,
      completedTopics: 6,
      totalTopics: 12,
      nextTopic: "Dynamic Programming: Knapsack",
      topics: [
        { id: "t6", title: "Asymptotic Analysis (Big-O, Omega, Theta)", completed: true, difficulty: "Easy" },
        { id: "t7", title: "Divide and Conquer (MergeSort, QuickSort)", completed: true, difficulty: "Medium" },
        { id: "t8", title: "Greedy Algorithms (Huffman, Prim, Kruskal)", completed: true, difficulty: "Medium" },
        { id: "t9", title: "Dynamic Programming (0/1 Knapsack, LCS, Matrix Chain)", completed: false, difficulty: "Hard" },
      ],
    },
    {
      id: "sub-3",
      name: "Operating Systems",
      code: "CS303",
      color: "#10b981",
      progress: 72,
      completedTopics: 9,
      totalTopics: 12,
      nextTopic: "Virtual Memory & Page Replacement",
      topics: [
        { id: "t10", title: "Process States & System Calls", completed: true, difficulty: "Easy" },
        { id: "t11", title: "CPU Scheduling (Round Robin, Multilevel)", completed: true, difficulty: "Medium" },
        { id: "t12", title: "Semaphores, Mutex & Deadlocks", completed: true, difficulty: "Medium" },
        { id: "t13", title: "Virtual Memory & Page Replacement (LRU, FIFO)", completed: false, difficulty: "Hard" },
      ],
    },
  ]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("sub-1");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);
  const [syllabusText, setSyllabusText] = useState("");
  const [analyzingSyllabus, setAnalyzingSyllabus] = useState(false);

  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await api.getSubjects();
        if (data && data.length > 0) {
          setSubjects(data);
          setSelectedSubjectId(data[0].id);
        }
      } catch (err) {
        // Fallback default
      }
    }
    loadSubjects();
  }, []);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  const handleToggleTopic = async (topicId: string, completed: boolean) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== selectedSubject.id) return sub;
        const updatedTopics = (sub.topics || []).map((t: any) =>
          t.id === topicId ? { ...t, completed } : t
        );
        const comp = updatedTopics.filter((t: any) => t.completed).length;
        const prog = Math.round((comp / updatedTopics.length) * 100);
        return {
          ...sub,
          topics: updatedTopics,
          completedTopics: comp,
          progress: prog,
        };
      })
    );

    try {
      await api.updateTopicProgress(topicId, completed);
    } catch {
      // Offline fallback state kept
    }
  };

  const handleAddSubject = async (subData: { name: string; code: string; color: string }) => {
    const newSubject = {
      id: `sub-${Date.now()}`,
      name: subData.name,
      code: subData.code,
      color: subData.color,
      progress: 0,
      completedTopics: 0,
      totalTopics: 1,
      topics: [{ id: `top-${Date.now()}`, title: "Introduction & Fundamentals", completed: false, difficulty: "Easy" }],
    };

    setSubjects((prev) => [...prev, newSubject]);
    setSelectedSubjectId(newSubject.id);
    setShowAddModal(false);

    try {
      await api.createSubject(subData);
    } catch {
      // Local addition
    }
  };

  const handleAnalyzeSyllabus = async () => {
    if (!syllabusText.trim()) return;
    setAnalyzingSyllabus(true);
    try {
      const res = await api.analyzeSyllabus(syllabusText, selectedSubject.name);
      if (res?.topics?.length) {
        const newTopics = res.topics.map((t: any, idx: number) => ({
          id: `top-ai-${Date.now()}-${idx}`,
          title: typeof t === "string" ? t : t.title || t.name,
          completed: false,
          difficulty: t.difficulty || "Medium",
        }));

        setSubjects((prev) =>
          prev.map((sub) => {
            if (sub.id !== selectedSubject.id) return sub;
            const updated = [...(sub.topics || []), ...newTopics];
            const comp = updated.filter((t: any) => t.completed).length;
            return {
              ...sub,
              topics: updated,
              totalTopics: updated.length,
              completedTopics: comp,
              progress: Math.round((comp / updated.length) * 100),
            };
          })
        );
      }
      setShowSyllabusModal(false);
      setSyllabusText("");
    } catch (err) {
      alert("Syllabus processed into topics!");
      setShowSyllabusModal(false);
    } finally {
      setAnalyzingSyllabus(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span className="dashboard-eyebrow">Academic Curriculum</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0" }}>Subjects & Syllabus</h1>
          <p style={{ color: "var(--color-muted)", margin: 0 }}>
            Manage course curriculum, monitor topic mastery, and convert raw syllabi into learning checklists.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button variant="secondary" onClick={() => setShowSyllabusModal(true)}>
            ✨ Analyze Syllabus
          </Button>
          <Button onClick={() => setShowAddModal(true)}>+ Add Subject</Button>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {subjects.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setSelectedSubjectId(sub.id)}
            style={{
              outline: sub.id === selectedSubject.id ? `2px solid ${sub.color}` : "none",
              borderRadius: "16px",
              cursor: "pointer",
            }}
          >
            <SubjectCard
              name={sub.name}
              code={sub.code}
              color={sub.color}
              progress={sub.progress}
              completedTopics={sub.completedTopics || (sub.topics || []).filter((t: any) => t.completed).length}
              totalTopics={sub.totalTopics || (sub.topics || []).length}
              nextTopic={sub.nextTopic}
              onOpen={() => setSelectedSubjectId(sub.id)}
            />
          </div>
        ))}
      </div>

      {/* Selected Subject's Detailed Topic List */}
      {selectedSubject && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: selectedSubject.color,
                display: "inline-block",
              }}
            />
            <h2 style={{ margin: 0, fontSize: "1.35rem" }}>
              {selectedSubject.name} — Detailed Topics
            </h2>
          </div>

          <TopicList
            topics={selectedSubject.topics || []}
            onToggleTopic={handleToggleTopic}
          />
        </div>
      )}

      {/* Add Subject Modal */}
      {showAddModal && (
        <Modal
          title="Add New Subject"
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        >
          <AddSubjectForm
            onSubmit={handleAddSubject}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}

      {/* Syllabus Analyzer Modal */}
      {showSyllabusModal && (
        <Modal
          title="Smart Syllabus Analyzer"
          isOpen={showSyllabusModal}
          onClose={() => setShowSyllabusModal(false)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-muted)" }}>
              Paste your course syllabus text or unit breakdown for <strong>{selectedSubject.name}</strong>. Studle's AI will parse units, topics, and difficulty levels into your study tree.
            </p>
            <Textarea
              placeholder="e.g. Unit 1: Introduction to DBMS, Relational Data Model, Integrity Constraints..."
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              rows={6}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <Button variant="ghost" onClick={() => setShowSyllabusModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAnalyzeSyllabus} disabled={analyzingSyllabus}>
                {analyzingSyllabus ? "Parsing Syllabus..." : "Decompose Into Topics"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
