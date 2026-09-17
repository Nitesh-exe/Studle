// frontend/src/components/layout/Container.tsx
import type { ReactNode } from "react";
import "./layout.css";

type ContainerProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
};

export default function Container({
  children,
  size = "lg",
  className = "",
}: ContainerProps) {
  return (
    <div className={`layout-container layout-container-${size} ${className}`}>
      {children}
    </div>
  );
}