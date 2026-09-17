// frontend/src/components/ui/Spinner.tsx
import "./ui.css";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
};

export default function Spinner({
  size = "md",
  label = "Loading",
}: SpinnerProps) {
  return (
    <span className="ui-spinner-wrapper" role="status" aria-label={label}>
      <span className={`ui-spinner ui-spinner-${size}`} />
    </span>
  );
}