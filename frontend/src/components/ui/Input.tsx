// frontend/src/components/ui/Input.tsx
import type { InputHTMLAttributes } from "react";
import "./ui.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="ui-input-field" htmlFor={inputId}>
      {label && <span className="ui-input-label">{label}</span>}

      <input
        id={inputId}
        className={`ui-input ${error ? "ui-input-error" : ""} ${className}`}
        {...props}
      />

      {error && <span className="ui-input-message">{error}</span>}
    </label>
  );
}

export default Input;