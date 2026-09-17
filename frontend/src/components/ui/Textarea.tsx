// frontend/src/components/ui/Textarea.tsx
import type { TextareaHTMLAttributes } from "react";
import "./ui.css";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="ui-input-field" htmlFor={textareaId}>
      {label && <span className="ui-input-label">{label}</span>}

      <textarea
        id={textareaId}
        className={`ui-textarea ${error ? "ui-input-error" : ""} ${className}`}
        {...props}
      />

      {error && <span className="ui-input-message">{error}</span>}
    </label>
  );
}

export default Textarea;