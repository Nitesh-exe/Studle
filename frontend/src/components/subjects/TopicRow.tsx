// frontend/src/components/subjects/TopicRow.tsx
import { Checkbox } from "../ui/Checkbox";
import { Badge } from "../ui/Badge";
import "./subjects.css";

type TopicRowProps = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  difficulty?: "Easy" | "Medium" | "Hard";
  onToggle?: (id: string, completed: boolean) => void;
  onOpen?: (id: string) => void;
};

export function TopicRow({
  id,
  title,
  description,
  completed,
  difficulty,
  onToggle,
  onOpen,
}: TopicRowProps) {
  return (
    <div className={`topic-row${completed ? " topic-row--completed" : ""}`}>
      <Checkbox
        checked={completed}
        onChange={(event) => onToggle?.(id, event.target.checked)}
        aria-label={`Mark ${title} as ${completed ? "incomplete" : "complete"}`}
      />

      <button className="topic-row__content" onClick={() => onOpen?.(id)}>
        <strong>{title}</strong>
        {description && <span>{description}</span>}
      </button>

      {difficulty && (
        <Badge
          tone={
            difficulty === "Hard"
              ? "danger"
              : difficulty === "Medium"
                ? "warning"
                : "success"
          }
        >
          {difficulty}
        </Badge>
      )}
    </div>
  );
}