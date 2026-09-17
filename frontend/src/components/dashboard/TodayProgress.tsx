// frontend/src/components/dashboard/TodayProgress.tsx
import { Card } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";
import "./dashboard.css";

type TodayProgressProps = {
  completed: number;
  total: number;
  minutesStudied: number;
  targetMinutes: number;
};

export function TodayProgress({
  completed,
  total,
  minutesStudied,
  targetMinutes,
}: TodayProgressProps) {
  const taskProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const timeProgress =
    targetMinutes > 0
      ? Math.min(100, Math.round((minutesStudied / targetMinutes) * 100))
      : 0;

  return (
    <Card className="dashboard-panel today-progress">
      <div className="panel-heading">
        <div>
          <span className="dashboard-eyebrow">Daily plan</span>
          <h2>Today's progress</h2>
        </div>
        <span className="panel-heading__icon">📈</span>
      </div>

      <div className="progress-summary">
        <div>
          <strong>
            {completed}/{total}
          </strong>
          <span>tasks completed</span>
        </div>

        <div className="progress-summary__percentage">{taskProgress}%</div>
      </div>

      <ProgressBar value={taskProgress} />

      <div className="progress-metrics">
        <div>
          <span>Study time</span>
          <strong>
            {minutesStudied} / {targetMinutes} min
          </strong>
        </div>

        <div>
          <span>Time goal</span>
          <strong>{timeProgress}%</strong>
        </div>
      </div>

      <ProgressBar value={timeProgress} />
    </Card>
  );
}