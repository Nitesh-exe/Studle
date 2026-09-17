// frontend/src/components/ui/EmptyState.tsx
import type { ReactNode } from "react";
import "./ui.css";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="ui-empty-state">
      {icon && <div className="ui-empty-icon">{icon}</div>}

      <h3 className="ui-empty-title">{title}</h3>

      {description && (
        <p className="ui-empty-description">{description}</p>
      )}

      {action && <div className="ui-empty-action">{action}</div>}
    </div>
  );
}