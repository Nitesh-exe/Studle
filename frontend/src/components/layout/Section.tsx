// frontend/src/components/layout/Section.tsx
import type { ReactNode } from "react";
import "./layout.css";

type SectionProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function Section({
  title,
  description,
  action,
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`layout-section ${className}`}>
      {(title || description || action) && (
        <div className="layout-section-header">
          <div>
            {title && <h2 className="layout-section-title">{title}</h2>}
            {description && (
              <p className="layout-section-description">{description}</p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      )}

      {children}
    </section>
  );
}