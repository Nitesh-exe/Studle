// frontend/src/components/ui/Divider.tsx
import "./ui.css";

type DividerProps = {
  label?: string;
  vertical?: boolean;
};

export default function Divider({
  label,
  vertical = false,
}: DividerProps) {
  if (vertical) {
    return <span className="ui-divider ui-divider-vertical" />;
  }

  return (
    <div className="ui-divider">
      {label && <span className="ui-divider-label">{label}</span>}
    </div>
  );
}