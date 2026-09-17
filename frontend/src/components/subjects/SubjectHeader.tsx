// frontend/src/components/subjects/SubjectHeader.tsx
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";
import "./subjects.css";

type SubjectHeaderProps = {
  name: string;
  code?: string;
  description?: string;
  progress: number;
  onBack?: () => void;
  onAddTopic?: () => void;
};

export function SubjectHeader({
  name,
  code,
  description,
  progress,
  onBack,
  onAddTopic,
}: SubjectHeaderProps) {
  return (
    <Card className="subject-header">
      <div className="subject-header__top">
        <button className="subject-back-button" onClick={onBack}>
          ← Back
        </button>

        <Button onClick={onAddTopic}>Add topic</Button>
      </div>

      <div className="subject-header__identity">
        <div>
          <span className="dashboard-eyebrow">Subject overview</span>
          <h1>{name}</h1>
          {code && <span className="subject-header__code">{code}</span>}
          {description && <p>{description}</p>}
        </div>

        <div className="subject-header__percentage">{progress}%</div>
      </div>

      <ProgressBar value={progress} />
    </Card>
  );
}