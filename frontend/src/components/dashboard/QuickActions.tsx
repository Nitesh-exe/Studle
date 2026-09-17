// frontend/src/components/dashboard/QuickActions.tsx
import { Card } from "../ui/Card";
import "./dashboard.css";

type QuickAction = {
  label: string;
  description: string;
  icon: string;
  onClick: () => void;
};

type QuickActionsProps = {
  actions: QuickAction[];
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card className="dashboard-panel">
      <div className="panel-heading">
        <div>
          <span className="dashboard-eyebrow">Jump right in</span>
          <h2>Quick actions</h2>
        </div>
      </div>

      <div className="quick-actions">
        {actions.map((action) => (
          <button
            className="quick-action"
            key={action.label}
            onClick={action.onClick}
          >
            <span className="quick-action__icon">{action.icon}</span>

            <span className="quick-action__content">
              <strong>{action.label}</strong>
              <small>{action.description}</small>
            </span>

            <span className="quick-action__arrow">→</span>
          </button>
        ))}
      </div>
    </Card>
  );
}