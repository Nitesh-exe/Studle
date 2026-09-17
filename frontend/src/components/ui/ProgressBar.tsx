// frontend/src/components/ui/ProgressBar.tsx
import "./ui.css";

type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  size = "md",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="ui-progress-wrapper">
      {(label || showValue) && (
        <div className="ui-progress-meta">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(percentage)}%</span>}
        </div>
      )}

      <div
        className={`ui-progress ui-progress-${size}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="ui-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;