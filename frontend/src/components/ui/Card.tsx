// frontend/src/components/ui/Card.tsx
import type { HTMLAttributes, ReactNode } from "react";
import "./ui.css";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  title?: string;
  description?: string;
};

export function Card({
  children,
  title,
  description,
  className = "",
  ...props
}: CardProps) {
  return (
    <section className={`ui-card ${className}`} {...props}>
      {(title || description) && (
        <header className="ui-card-header">
          {title && <h3 className="ui-card-title">{title}</h3>}
          {description && <p className="ui-card-description">{description}</p>}
        </header>
      )}

      <div className="ui-card-content">{children}</div>
    </section>
  );
}

export default Card;