// frontend/src/components/layout/Grid.tsx
import type { CSSProperties, ReactNode } from "react";
import "./layout.css";

type GridProps = {
  children: ReactNode;
  columns?: number;
  gap?: number;
  minWidth?: number;
  className?: string;
};

export default function Grid({
  children,
  columns = 2,
  gap = 18,
  minWidth = 240,
  className = "",
}: GridProps) {
  return (
    <div
      className={`layout-grid ${className}`}
      style={
        {
          "--grid-columns": columns,
          "--grid-gap": `${gap}px`,
          "--grid-min-width": `${minWidth}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}