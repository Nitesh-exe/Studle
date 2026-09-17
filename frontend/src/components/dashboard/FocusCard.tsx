// frontend/src/components/dashboard/FocusCard.tsx
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import "./dashboard.css";

type FocusCardProps = {
  subject: string;
  topic: string;
  duration: number;
  onStart?: () => void;
};

export function FocusCard({
  subject,
  topic,
  duration,
  onStart,
}: FocusCardProps) {
  return (
    <Card className="focus-card">
      <div className="focus-card__glow" />

      <div className="focus-card__content">
        <span className="dashboard-eyebrow">Recommended focus</span>
        <h2>{topic}</h2>
        <p>
          Continue your <strong>{subject}</strong> study plan with a focused
          {` ${duration}-minute session.`}
        </p>

        <div className="focus-card__footer">
          <span>⏱ {duration} minutes</span>
          <Button onClick={onStart}>Start session</Button>
        </div>
      </div>

      <div className="focus-card__illustration" aria-hidden="true">
        🧠
      </div>
    </Card>
  );
}