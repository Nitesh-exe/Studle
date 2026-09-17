// frontend/src/components/dashboard/StudyGoalCard.tsx
import { Card } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";
import "./dashboard.css";

type StudyGoalCardProps = {
  title: string;
  description: string;
  completed: number;
  target: number;
  unit?: string;
  icon?: string;
};

export function StudyGoalCard({
  title,
  description,
  completed,
  target,
  unit = "sessions",
  icon = "🎯",
}: StudyGoalCardProps) {
  const progress =
    target > 0 ? Math.min(100, Math.round((completed / target) * 100)) : 0;

  return (
    <Card className="study-goal-card">
      <div className="study-goal-card__header">
        <span className="study-goal-card__icon">{icon}</span>
        <span className="study-goal-card__percentage">{progress}%</span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <ProgressBar value={progress} />

      <div className="study-goal-card__footer">
        <span>
          {completed} of {target} {unit}
        </span>
        <strong>{target - completed > 0 ? `${target - completed} left` : "Complete"}</strong>
      </div>
    </Card>
  );
}