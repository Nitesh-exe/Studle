// frontend/src/components/layout/Topbar.tsx
import type { ReactNode } from "react";
import Avatar from "../ui/Avatar";
import "./layout.css";

type TopbarProps = {
  userName: string;
  avatarUrl?: string;
  title?: string;
  actions?: ReactNode;
  onProfileClick?: () => void;
};

export default function Topbar({
  userName,
  avatarUrl,
  title = "Dashboard",
  actions,
  onProfileClick,
}: TopbarProps) {
  return (
    <header className="app-topbar">
      <div className="topbar-heading">
        <span className="topbar-eyebrow">Your workspace</span>
        <h1>{title}</h1>
      </div>

      <div className="topbar-actions">
        {actions}

        <button
          type="button"
          className="topbar-profile"
          onClick={onProfileClick}
          aria-label="Open profile"
        >
          <Avatar name={userName} imageUrl={avatarUrl} size="sm" />
          <span className="topbar-profile-name">{userName}</span>
          <span className="topbar-profile-chevron">⌄</span>
        </button>
      </div>
    </header>
  );
}