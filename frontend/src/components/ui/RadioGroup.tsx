// frontend/src/components/ui/RadioGroup.tsx
import type { ChangeEvent } from "react";
import "./ui.css";

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
};

export default function RadioGroup({
  name,
  value,
  options,
  onChange,
}: RadioGroupProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="ui-radio-group">
      {options.map((option) => (
        <label className="ui-radio" key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
          />
          <span className="ui-radio-dot" />
          <span className="ui-radio-label">{option.label}</span>
        </label>
      ))}
    </div>
  );
}