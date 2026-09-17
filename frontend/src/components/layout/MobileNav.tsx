// frontend/src/components/layout/MobileNav.tsx
import { NAV_ITEMS } from "../../lib/constants";
import "./layout.css";

type MobileNavProps = {
  activePath: string;
  onNavigate: (path: string) => void;
};

export default function MobileNav({
  activePath,
  onNavigate,
}: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {NAV_ITEMS.slice(0, 4).map((item) => {
        const active =
          item.path === "/"
            ? activePath === "/"
            : activePath.startsWith(item.path);

        return (
          <button
            key={item.path}
            type="button"
            className={`mobile-nav-item ${
              active ? "mobile-nav-item-active" : ""
            }`}
            onClick={() => onNavigate(item.path)}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}