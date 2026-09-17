// frontend/src/components/subjects/SubjectList.tsx
import { SubjectCard } from "./SubjectCard";
import "./subjects.css";

type Subject = {
  id: string;
  name: string;
  code?: string;
  color?: string;
  progress: number;
  completedTopics: number;
  totalTopics: number;
  nextTopic?: string;
};

type SubjectListProps = {
  subjects: Subject[];
  onOpenSubject?: (subject: Subject) => void;
};

export function SubjectList({
  subjects,
  onOpenSubject,
}: SubjectListProps) {
  if (subjects.length === 0) {
    return (
      <div className="subjects-empty">
        <span>📚</span>
        <h3>No subjects yet</h3>
        <p>Add your first subject to start organizing your study plan.</p>
      </div>
    );
  }

  return (
    <div className="subject-list">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          {...subject}
          onOpen={() => onOpenSubject?.(subject)}
        />
      ))}
    </div>
  );
}