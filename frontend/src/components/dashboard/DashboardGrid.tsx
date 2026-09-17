// frontend/src/components/dashboard/DashboardGrid.tsx
import { ReactNode } from "react";
import "./dashboard.css";

type DashboardGridProps = {
  children: ReactNode;
  columns?: 1 | 2 | 3;
};

export function DashboardGrid({
  children,
  columns = 2,
}: DashboardGridProps) {
  return (
    <div className={`dashboard-grid dashboard-grid--${columns}`}>
      {children}
    </div>
  );
}