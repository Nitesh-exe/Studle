// frontend/src/components/dashboard/WelcomeBanner.tsx
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import "./dashboard.css";

type WelcomeBannerProps = {
  name: string;
  streak: number;
  onStartStudy?: () => void;
};

export function WelcomeBanner({
  name,
  streak,
  onStartStudy,
}: WelcomeBannerProps) {
  return (
    <Card className="welcome-banner">
      <div>
        <span className="dashboard-eyebrow">Your learning space</span>
        <h1>Welcome back, {name} 👋</h1>
        <p>
          Keep your momentum going. A little progress today adds up to big
          results.
        </p>

        <div className="welcome-banner__meta">
          <span>🔥 {streak} day streak</span>
          <span>•</span>
          <span>Stay consistent</span>
        </div>
      </div>

      <div className="welcome-banner__action">
        <Button onClick={onStartStudy}>Start studying</Button>
      </div>
    </Card>
  );
}