// frontend/src/components/dashboard/StatsGrid.tsx
import { Card } from "../ui/Card";
import "./dashboard.css";

type Stat = {
  label: string;
  value: string | number;
  detail?: string;
  icon: string;
  tone?: "blue" | "green" | "orange" | "purple";
};

type StatsGridProps = {
  stats: Stat[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={`stat-card stat-card--${stat.tone ?? "blue"}`}
        >
          <div className="stat-card__top">
            <span className="stat-card__icon">{stat.icon}</span>
            {stat.detail && <span className="stat-card__detail">{stat.detail}</span>}
          </div>

          <strong className="stat-card__value">{stat.value}</strong>
          <span className="stat-card__label">{stat.label}</span>
        </Card>
      ))}
    </div>
  );
}