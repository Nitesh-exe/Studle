// frontend/src/components/dashboard/WeeklyActivity.tsx
import { Card } from "../ui/Card";
import "./dashboard.css";

type WeeklyActivityItem = {
  day: string;
  minutes: number;
  label?: string;
};

type WeeklyActivityProps = {
  items: WeeklyActivityItem[];
  goal?: number;
};

export function WeeklyActivity({
  items,
  goal = 60,
}: WeeklyActivityProps) {
  const maxMinutes = Math.max(goal, ...items.map((item) => item.minutes), 1);

  return (
    <Card className="dashboard-panel weekly-activity">
      <div className="panel-heading">
        <div>
          <span className="dashboard-eyebrow">Consistency matters</span>
          <h2>Weekly activity</h2>
        </div>
        <span className="panel-heading__icon">📊</span>
      </div>

      <div className="weekly-activity__chart">
        {items.map((item) => {
          const height = Math.max(4, (item.minutes / maxMinutes) * 100);

          return (
            <div className="weekly-activity__column" key={item.day}>
              <div className="weekly-activity__bar-area">
                <span
                  className="weekly-activity__bar"
                  style={{ height: `${height}%` }}
                  title={`${item.minutes} minutes`}
                />
              </div>
              <span className="weekly-activity__day">{item.day}</span>
              <small>{item.label ?? `${item.minutes}m`}</small>
            </div>
          );
        })}
      </div>
    </Card>
  );
}