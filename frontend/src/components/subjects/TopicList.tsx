// frontend/src/components/subjects/TopicList.tsx
import { Card } from "../ui/Card";
import { TopicRow } from "./TopicRow";
import "./subjects.css";

type Topic = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  difficulty?: "Easy" | "Medium" | "Hard";
};

type TopicListProps = {
  topics: Topic[];
  onToggleTopic?: (id: string, completed: boolean) => void;
  onOpenTopic?: (id: string) => void;
};

export function TopicList({
  topics,
  onToggleTopic,
  onOpenTopic,
}: TopicListProps) {
  return (
    <Card className="topic-list-card">
      <div className="panel-heading">
        <div>
          <span className="dashboard-eyebrow">Learning checklist</span>
          <h2>Topics</h2>
        </div>

        <span className="topic-list-card__count">
          {topics.filter((topic) => topic.completed).length}/{topics.length}
        </span>
      </div>

      {topics.length === 0 ? (
        <div className="subjects-empty">
          <span>🗂️</span>
          <p>No topics added yet.</p>
        </div>
      ) : (
        <div className="topic-list">
          {topics.map((topic) => (
            <TopicRow
              key={topic.id}
              {...topic}
              onToggle={onToggleTopic}
              onOpen={onOpenTopic}
            />
          ))}
        </div>
      )}
    </Card>
  );
}