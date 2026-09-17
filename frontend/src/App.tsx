import { useEffect, useState } from "react";

type Task = {
  title: string;
  subject: string;
  due: string;
  priority: "High" | "Medium" | "Low";
};

const tasks: Task[] = [
  { title: "Complete DBMS assignment", subject: "DBMS", due: "Today", priority: "High" },
  { title: "Revise Dynamic Programming", subject: "DAA", due: "Tomorrow", priority: "Medium" },
  { title: "Prepare cloud presentation", subject: "Cloud Computing", due: "Friday", priority: "Medium" },
];

const subjects = [
  { name: "DBMS", progress: 72 },
  { name: "DAA", progress: 54 },
  { name: "Operating Systems", progress: 41 },
  { name: "Cloud Computing", progress: 68 },
];

export default function App() {
  const [apiStatus, setApiStatus] = useState("Checking API…");

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then((response) => {
        if (!response.ok) throw new Error("API unavailable");
        return response.json();
      })
      .then(() => setApiStatus("API online"))
      .catch(() => setApiStatus("Demo mode"));
  }, []);

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">studle<span>.</span></div>
        <p className="muted">Your academic companion</p>
        <nav>
          <a className="active">Dashboard</a>
          <a>Academics</a>
          <a>AI Study Hub</a>
          <a>Planning & Focus</a>
          <a>Performance</a>
        </nav>
        <div className="sidebar-footer">
          <span className="status-dot" /> {apiStatus}
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Thursday, September 17</p>
            <h1>Good evening, Nikhil 👋</h1>
          </div>
          <div className="avatar">N</div>
        </header>

        <section className="hero card">
          <div>
            <p className="eyebrow">Today’s mission</p>
            <h2>Make progress before the day ends.</h2>
            <p className="muted">Finish your DBMS assignment, then revise one DAA topic.</p>
            <button>Start mission</button>
          </div>
          <div className="hero-stat">
            <strong>68%</strong>
            <span>weekly progress</span>
          </div>
        </section>

        <div className="grid two">
          <section className="card">
            <div className="section-heading"><h2>Upcoming exams</h2><span>View all</span></div>
            <div className="exam"><b>DBMS</b><span>5 days left</span></div>
            <div className="exam"><b>DAA</b><span>12 days left</span></div>
            <div className="exam"><b>Operating Systems</b><span>18 days left</span></div>
          </section>

          <section className="card">
            <div className="section-heading"><h2>Study streak</h2><span>Keep going</span></div>
            <div className="streak-number">7 <small>days</small></div>
            <p className="muted">You studied 5 of the last 7 days.</p>
          </section>
        </div>

        <section className="card">
          <div className="section-heading"><h2>Today’s tasks</h2><span>{tasks.length} tasks</span></div>
          {tasks.map((task) => (
            <div className="task" key={task.title}>
              <div className="checkbox" />
              <div className="task-main"><b>{task.title}</b><span>{task.subject} · {task.due}</span></div>
              <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
            </div>
          ))}
        </section>

        <section className="card">
          <div className="section-heading"><h2>Subject progress</h2><span>Semester 5</span></div>
          {subjects.map((subject) => (
            <div className="progress-row" key={subject.name}>
              <div><b>{subject.name}</b><span>{subject.progress}%</span></div>
              <div className="progress-track"><div style={{ width: `${subject.progress}%` }} /></div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
