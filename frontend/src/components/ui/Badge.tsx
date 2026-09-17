// frontend/src/components/ui/Badge.tsx
import type { ReactNode } from "react";
import "./ui.css";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  tone?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
};

export function Badge({
  children,
  variant,
  tone,
  size = "md",
}: BadgeProps) {
  const finalVariant = tone || variant || "default";
  return (
    <span className={`ui-badge ui-badge-${finalVariant} ui-badge-${size}`}>
      {children}
    </span>
  );
}

export default Badge;