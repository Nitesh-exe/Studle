// frontend/src/components/ui/Switch.tsx
import type { InputHTMLAttributes } from "react";
import "./ui.css";

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export default function Switch({
  label,
  className = "",
  ...props
}: SwitchProps) {
  return (
    <label className={`ui-switch ${className}`}>
      <input type="checkbox" {...props} />
      <span className="ui-switch-track">
        <span className="ui-switch-thumb" />
      </span>
      {label && <span className="ui-switch-label">{label}</span>}
    </label>
  );
}