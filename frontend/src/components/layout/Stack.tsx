// frontend/src/components/layout/Stack.tsx
import type { CSSProperties, ReactNode } from "react";
import "./layout.css";

type StackProps = {
  children: ReactNode;
  gap?: number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  className?: string;
};

export default function Stack({
  children,
  gap = 16,
  align,
  justify,
  className = "",
}: StackProps) {
  return (
    <div
      className={`layout-stack ${className}`}
      style={{
        gap,
        alignItems: align,
        justifyContent: justify,
      }}
    >
      {children}
    </div>
  );
}