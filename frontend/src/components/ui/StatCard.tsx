// frontend/src/components/ui/StatCard.tsx
import type { ReactNode } from "react";
import "./ui.css";

type StatCardProps = {
  label: string;
  value: string | number;
  change?: string;
  icon?: ReactNode;
  positive?: boolean;
};

export default function StatCard({
  label,
  value,
  change,
  icon,
  positive = true,
}: StatCardProps) {
  return (
    <article className="ui-stat-card">
      <div className="ui-stat-top">
        <span className="ui-stat-label">{label}</span>
        {icon && <span className="ui-stat-icon">{icon}</span>}
      </div>

      <div className="ui-stat-value">{value}</div>

      {change && (
        <div
          className={`ui-stat-change ${
            positive ? "ui-stat-change-positive" : "ui-stat-change-negative"
          }`}
        >
          {change}
        </div>
      )}
    </article>
  );
}