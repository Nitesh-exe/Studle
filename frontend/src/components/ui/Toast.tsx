// frontend/src/components/ui/Toast.tsx
import type { ReactNode } from "react";
import "./ui.css";

type ToastProps = {
  title: string;
  message?: string;
  variant?: "success" | "error" | "info" | "warning";
  icon?: ReactNode;
  onClose?: () => void;
};

export default function Toast({
  title,
  message,
  variant = "info",
  icon,
  onClose,
}: ToastProps) {
  return (
    <div className={`ui-toast ui-toast-${variant}`} role="status">
      <div className="ui-toast-icon">{icon ?? "!"}</div>

      <div className="ui-toast-body">
        <strong>{title}</strong>
        {message && <p>{message}</p>}
      </div>

      {onClose && (
        <button
          type="button"
          className="ui-toast-close"
          aria-label="Close notification"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
}