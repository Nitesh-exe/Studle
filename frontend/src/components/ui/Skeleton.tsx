// frontend/src/components/ui/Skeleton.tsx
import "./ui.css";

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  radius?: "sm" | "md" | "lg" | "round";
  className?: string;
};

export default function Skeleton({
  width = "100%",
  height = 16,
  radius = "md",
  className = "",
}: SkeletonProps) {
  return (
    <span
      className={`ui-skeleton ui-skeleton-${radius} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}