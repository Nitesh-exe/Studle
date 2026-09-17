// frontend/src/components/ui/Select.tsx
import type { SelectHTMLAttributes } from "react";
import "./ui.css";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
};

export default function Select({
  label,
  options,
  placeholder = "Select an option",
  id,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="ui-input-field" htmlFor={selectId}>
      {label && <span className="ui-input-label">{label}</span>}

      <select id={selectId} className={`ui-input ${className}`} {...props}>
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}