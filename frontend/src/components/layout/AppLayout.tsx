// frontend/src/components/layout/AppLayout.tsx
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./layout.css";

type AppLayoutProps = {
  children: ReactNode;
  activePath: string;
  userName: string;
  avatarUrl?: string;
  title?: string;
  sidebarFooter?: ReactNode;
  topbarActions?: ReactNode;
  onNavigate: (path: string) => void;
  onProfileClick?: () => void;
};

export default function AppLayout({
  children,
  activePath,
  userName,
  avatarUrl,
  title,
  sidebarFooter,
  topbarActions,
  onNavigate,
  onProfileClick,
}: AppLayoutProps) {
  return (
    <div className="app-shell">
      <Sidebar
        activePath={activePath}
        onNavigate={onNavigate}
        footer={sidebarFooter}
      />

      <div className="app-main">
        <Topbar
          userName={userName}
          avatarUrl={avatarUrl}
          title={title}
          actions={topbarActions}
          onProfileClick={onProfileClick}
        />

        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}