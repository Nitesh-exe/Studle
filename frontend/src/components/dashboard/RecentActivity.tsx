// frontend/src/components/dashboard/RecentActivity.tsx
import { Card } from "../ui/Card";
import "./dashboard.css";

type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
};

type RecentActivityProps = {
  activities: Activity[];
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="dashboard-panel">
      <div className="panel-heading">
        <div>
          <span className="dashboard-eyebrow">Your timeline</span>
          <h2>Recent activity</h2>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="dashboard-empty">
          <span>📝</span>
          <p>Your recent study activity will appear here.</p>
        </div>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <div className="activity-item" key={activity.id}>
              <span className="activity-item__icon">{activity.icon}</span>

              <div className="activity-item__content">
                <strong>{activity.title}</strong>
                <p>{activity.description}</p>
              </div>

              <time>{activity.time}</time>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}