// frontend/src/components/ui/Dropdown.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import "./ui.css";

type DropdownItem = {
  label: string;
  onClick: () => void;
  danger?: boolean;
};

type DropdownProps = {
  trigger: ReactNode;
  items: DropdownItem[];
};

export default function Dropdown({
  trigger,
  items,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ui-dropdown">
      <button
        type="button"
        className="ui-dropdown-trigger"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="ui-dropdown-overlay"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />

          <div className="ui-dropdown-menu">
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`ui-dropdown-item ${
                  item.danger ? "ui-dropdown-item-danger" : ""
                }`}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}