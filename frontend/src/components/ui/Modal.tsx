// frontend/src/components/ui/Modal.tsx
import type { ReactNode } from "react";
import "./ui.css";

type ModalProps = {
  open?: boolean;
  isOpen?: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
};

export default function Modal({
  open,
  isOpen,
  title,
  children,
  onClose,
  footer,
}: ModalProps) {
  const isVisible = isOpen !== undefined ? isOpen : Boolean(open);
  if (!isVisible) return null;


  return (
    <div className="ui-modal-backdrop" onClick={onClose}>
      <div
        className="ui-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ui-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="ui-modal-header">
          <h2 id="ui-modal-title" className="ui-modal-title">
            {title}
          </h2>

          <button
            type="button"
            className="ui-modal-close"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className="ui-modal-content">{children}</div>

        {footer && <footer className="ui-modal-footer">{footer}</footer>}
      </div>
    </div>
  );
}