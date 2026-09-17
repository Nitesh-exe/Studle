// frontend/src/components/ui/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./ui.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {

  return (
    <button
      className={`ui-button ui-button-${variant} ui-button-${size} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;