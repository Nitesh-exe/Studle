// frontend/src/components/ui/Tooltip.tsx
import type { ReactNode } from "react";
import "./ui.css";

type TooltipProps = {
  children: ReactNode;
  content: string;
};

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <span className="ui-tooltip">
      {children}
      <span className="ui-tooltip-content" role="tooltip">
        {content}
      </span>
    </span>
  );
}