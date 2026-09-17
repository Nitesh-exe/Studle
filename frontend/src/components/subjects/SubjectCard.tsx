// frontend/src/components/subjects/SubjectCard.tsx
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";
import "./subjects.css";

type SubjectCardProps = {
  name: string;
  code?: string;
  color?: string;
  progress: number;
  completedTopics: number;
  totalTopics: number;
  nextTopic?: string;
  onOpen?: () => void;
};

export function SubjectCard({
  name,
  code,
  color = "#6366f1",
  progress,
  completedTopics,
  totalTopics,
  nextTopic,
  onOpen,
}: SubjectCardProps) {
  return (
    <Card className="subject-card">
      <div className="subject-card__header">
        <span
          className="subject-card__mark"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        >
          {name.slice(0, 1).toUpperCase()}
        </span>

        <div className="subject-card__identity">
          <h3>{name}</h3>
          {code && <span>{code}</span>}
        </div>

        <Badge tone={progress >= 80 ? "success" : "info"}>
          {progress}%
        </Badge>
      </div>

      <div className="subject-card__progress">
        <ProgressBar value={progress} />
        <div>
          <span>
            {completedTopics} of {totalTopics} topics
          </span>
          <strong>{progress}% complete</strong>
        </div>
      </div>

      {nextTopic && (
        <div className="subject-card__next">
          <span>Next up</span>
          <strong>{nextTopic}</strong>
        </div>
      )}

      <Button variant="secondary" onClick={onOpen}>
        Open subject
      </Button>
    </Card>
  );
}