// frontend/src/components/ui/Checkbox.tsx
import type { InputHTMLAttributes } from "react";
import "./ui.css";

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
};

export function Checkbox({
  label,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label className={`ui-checkbox ${className}`}>
      <input type="checkbox" {...props} />
      <span className="ui-checkbox-box" />
      {label && <span className="ui-checkbox-label">{label}</span>}
    </label>
  );
}

export default Checkbox;