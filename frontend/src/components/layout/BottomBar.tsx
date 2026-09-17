// frontend/src/components/layout/BottomBar.tsx
import type { ReactNode } from "react";
import "./layout.css";

type BottomBarProps = {
  children: ReactNode;
};

export default function BottomBar({ children }: BottomBarProps) {
  return <div className="bottom-bar">{children}</div>;
}