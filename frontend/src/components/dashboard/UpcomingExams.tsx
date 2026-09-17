// frontend/src/components/dashboard/UpcomingExams.tsx
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import "./dashboard.css";

type UpcomingExam = {
  id: string;
  subject: string;
  date: string;
  daysLeft: number;
  topics?: string;
};

type UpcomingExamsProps = {
  exams: UpcomingExam[];
  onViewAll?: () => void;
};

export function UpcomingExams({
  exams,
  onViewAll,
}: UpcomingExamsProps) {
  return (
    <Card className="dashboard-panel">
      <div className="panel-heading">
        <div>
          <span className="dashboard-eyebrow">Stay prepared</span>
          <h2>Upcoming exams</h2>
        </div>

        <button className="text-button" onClick={onViewAll}>
          View all
        </button>
      </div>

      {exams.length === 0 ? (
        <div className="dashboard-empty">
          <span>🎉</span>
          <p>No upcoming exams. You're all caught up.</p>
        </div>
      ) : (
        <div className="exam-list">
          {exams.map((exam) => (
            <div className="exam-item" key={exam.id}>
              <div className="exam-item__date">
                <strong>{exam.daysLeft}</strong>
                <span>days</span>
              </div>

              <div className="exam-item__content">
                <strong>{exam.subject}</strong>
                <span>{exam.date}</span>
                {exam.topics && <small>{exam.topics}</small>}
              </div>

              <Badge tone={exam.daysLeft <= 3 ? "warning" : "info"}>
                {exam.daysLeft <= 3 ? "Soon" : "Planned"}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}