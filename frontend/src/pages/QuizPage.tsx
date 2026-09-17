// frontend/src/pages/QuizPage.tsx
import { useState } from "react";
import { Card, Button, Badge, ProgressBar } from "../components/ui";

import { api } from "../lib/api";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState("SQL Joins & Indexing");
  const [selectedSubject, setSelectedSubject] = useState("DBMS");
  const [generating, setGenerating] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q-1",
      question: "Which type of JOIN returns all records when there is a match in either left or right table?",
      options: ["INNER JOIN", "LEFT OUTER JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
      correctIndex: 2,
      explanation: "FULL OUTER JOIN combines the results of both LEFT and RIGHT outer joins, returning rows from both tables and filling in NULLs where no match occurs.",
    },
    {
      id: "q-2",
      question: "In a B+ Tree index with order m, all leaf nodes must appear at which level?",
      options: ["Any arbitrary level", "The same depth/level", "Level m/2 only", "Root level"],
      correctIndex: 1,
      explanation: "A fundamental property of B+ Trees is that all leaf nodes are at the same depth, guaranteeing O(log n) worst-case search, insertion, and deletion.",
    },
    {
      id: "q-3",
      question: "Which normal form removes transitive functional dependencies on the primary key?",
      options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
      correctIndex: 2,
      explanation: "3NF requires a relation to be in 2NF and have no non-prime attribute transitively dependent on any candidate key.",
    },
  ]);

  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ score: number; total: number; percentage: number } | null>(null);

  const handleSelectOption = (qIndex: number, optIndex: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmitQuiz = async () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });

    const result = {
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
    };

    setScoreResult(result);
    setSubmitted(true);

    try {
      await api.submitQuizAttempt("quiz-default", userAnswers as any);
    } catch {
      // Local scoring valid
    }
  };

  const handleGenerateNewQuiz = async () => {
    setGenerating(true);
    setSubmitted(false);
    setUserAnswers({});
    setScoreResult(null);

    try {
      const res = await api.generateQuiz({ topic_id: selectedTopic, subject_id: selectedSubject });
      if (res?.questions?.length) {
        setQuestions(
          res.questions.map((q: any, i: number) => ({
            id: `q-gen-${i}`,
            question: q.question,
            options: q.options,
            correctIndex: q.correct_index,
            explanation: q.explanation,
          }))
        );
      }
    } catch {
      // Fallback topic questions
      if (selectedSubject === "DAA") {
        setQuestions([
          {
            id: "qd-1",
            question: "What is the optimal substructure property required for Dynamic Programming?",
            options: [
              "Subproblems are completely independent",
              "Optimal solution contains optimal solutions to subproblems",
              "Algorithm must run in O(N log N) time",
              "Every decision must be greedy",
            ],
            correctIndex: 1,
            explanation: "Optimal substructure means an optimal solution to the global problem incorporates optimal solutions to subproblems.",
          },
          {
            id: "qd-2",
            question: "What is the time complexity of the 0/1 Knapsack dynamic programming solution with N items and capacity W?",
            options: ["O(N log N)", "O(2^N)", "O(N * W)", "O(W^2)"],
            correctIndex: 2,
            explanation: "0/1 Knapsack DP constructs a table of size (N+1) x (W+1), yielding pseudo-polynomial O(N * W) time.",
          },
        ]);
      } else {
        setQuestions([
          {
            id: "qo-1",
            question: "Which page replacement algorithm suffers from Belady's Anomaly?",
            options: ["LRU (Least Recently Used)", "Optimal Replacement", "FIFO (First In First Out)", "LFU (Least Frequently Used)"],
            correctIndex: 2,
            explanation: "FIFO can experience more page faults even when allocating more page frames, known as Belady's Anomaly.",
          },
          {
            id: "qo-2",
            question: "What hardware component caches virtual-to-physical address translations in the CPU?",
            options: ["L1 Cache", "Translation Lookaside Buffer (TLB)", "Instruction Register", "DMA Controller"],
            correctIndex: 1,
            explanation: "The TLB is an associative memory cache that stores recent page table translations to speed up memory access.",
          },
        ]);
      }
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span className="dashboard-eyebrow">Active Recall & Mastery</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0" }}>Quiz & Mastery Engine</h1>
          <p style={{ color: "var(--color-muted)", margin: 0 }}>
            Generate adaptive practice quizzes on any course topic. Results automatically update your mastery score and feed the priority planner.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          >
            <option value="DBMS">DBMS</option>
            <option value="DAA">DAA</option>
            <option value="OS">OS</option>
          </select>
          <Button onClick={handleGenerateNewQuiz} disabled={generating}>
            {generating ? "✨ Generating Questions..." : "✨ Generate AI Quiz"}
          </Button>
        </div>
      </div>

      {scoreResult && (
        <Card
          style={{
            padding: "1.5rem",
            background: scoreResult.percentage >= 70 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
            border: scoreResult.percentage >= 70 ? "1px solid #10b981" : "1px solid #ef4444",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 0.25rem 0", fontSize: "1.35rem" }}>
              {scoreResult.percentage >= 70 ? "🎉 Outstanding Retention!" : "📚 Review Needed"}
            </h2>
            <p style={{ margin: 0, color: "var(--color-muted)" }}>
              You scored {scoreResult.score} of {scoreResult.total} ({scoreResult.percentage}%). Topic mastery updated!
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: scoreResult.percentage >= 70 ? "#10b981" : "#ef4444" }}>
              {scoreResult.percentage}%
            </div>
            <Badge tone={scoreResult.percentage >= 70 ? "success" : "danger"}>
              {scoreResult.percentage >= 70 ? "Mastery: High" : "Mastery: Developing"}
            </Badge>
          </div>
        </Card>
      )}

      {/* Questions list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {questions.map((q, qIndex) => {
          const isAnswered = userAnswers[qIndex] !== undefined;
          const isCorrect = userAnswers[qIndex] === q.correctIndex;

          return (
            <Card key={q.id} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-primary)" }}>
                  Question {qIndex + 1} of {questions.length}
                </span>
                {submitted && (
                  <Badge tone={isCorrect ? "success" : "danger"}>
                    {isCorrect ? "Correct ✓" : "Incorrect ✕"}
                  </Badge>
                )}
              </div>

              <h3 style={{ margin: 0, fontSize: "1.15rem", lineHeight: 1.5 }}>{q.question}</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem" }}>
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[qIndex] === optIdx;
                  let bg = "rgba(255,255,255,0.03)";
                  let borderColor = "rgba(255,255,255,0.08)";

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      bg = "rgba(16, 185, 129, 0.15)";
                      borderColor = "#10b981";
                    } else if (isSelected && !isCorrect) {
                      bg = "rgba(239, 68, 68, 0.15)";
                      borderColor = "#ef4444";
                    }
                  } else if (isSelected) {
                    bg = "rgba(99, 102, 241, 0.18)";
                    borderColor = "var(--color-primary, #6366f1)";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(qIndex, optIdx)}
                      style={{
                        padding: "0.85rem 1rem",
                        borderRadius: "10px",
                        background: bg,
                        border: `1px solid ${borderColor}`,
                        color: "#fff",
                        textAlign: "left",
                        cursor: submitted ? "default" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        fontSize: "0.95rem",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isSelected ? "var(--color-primary)" : "rgba(255,255,255,0.1)",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                        }}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.03)",
                    borderLeft: "3px solid var(--color-primary)",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                    color: "var(--color-muted)",
                  }}
                >
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        {!submitted ? (
          <Button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(userAnswers).length !== questions.length}
          >
            Submit Quiz for Evaluation
          </Button>
        ) : (
          <Button onClick={handleGenerateNewQuiz}>Take Another Quiz</Button>
        )}
      </div>
    </div>
  );
}
