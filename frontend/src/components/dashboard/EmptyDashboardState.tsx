// frontend/src/components/dashboard/EmptyDashboardState.tsx
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import "./dashboard.css";

type EmptyDashboardStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyDashboardState({
  title = "Your study dashboard is ready",
  description = "Add a subject, create a study goal, or start your first session to see your progress here.",
  actionLabel = "Add your first subject",
  onAction,
}: EmptyDashboardStateProps) {
  return (
    <Card className="empty-dashboard-state">
      <div className="empty-dashboard-state__icon">✨</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button onClick={onAction}>{actionLabel}</Button>
    </Card>
  );
}