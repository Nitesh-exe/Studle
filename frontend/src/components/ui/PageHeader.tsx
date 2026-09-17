// frontend/src/components/ui/PageHeader.tsx
import type { ReactNode } from "react";
import "./ui.css";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="ui-page-header">
      <div>
        {eyebrow && <div className="ui-page-eyebrow">{eyebrow}</div>}
        <h1 className="ui-page-title">{title}</h1>
        {description && (
          <p className="ui-page-description">{description}</p>
        )}
      </div>

      {actions && <div className="ui-page-actions">{actions}</div>}
    </header>
  );
}