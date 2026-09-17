// frontend/src/components/layout/Sidebar.tsx
import type { ReactNode } from "react";
import { NAV_ITEMS } from "../../lib/constants";
import "./layout.css";

type SidebarProps = {
  activePath: string;
  onNavigate: (path: string) => void;
  footer?: ReactNode;
};

export default function Sidebar({
  activePath,
  onNavigate,
  footer,
}: SidebarProps) {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">S</div>
        <span>Studle</span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <div className="sidebar-nav-label">Workspace</div>

        {NAV_ITEMS.map((item) => {
          const active =
            item.path === "/"
              ? activePath === "/"
              : activePath.startsWith(item.path);

          return (
            <button
              key={item.path}
              type="button"
              className={`sidebar-nav-item ${
                active ? "sidebar-nav-item-active" : ""
              }`}
              onClick={() => onNavigate(item.path)}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-spacer" />

      {footer && <div className="sidebar-footer">{footer}</div>}
    </aside>
  );
}