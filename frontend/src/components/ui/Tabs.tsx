// frontend/src/components/ui/Tabs.tsx
import type { ReactNode } from "react";
import "./ui.css";

type Tab = {
  label: string;
  value: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
};

export function Tabs({
  tabs,
  activeTab,
  onChange,
}: TabsProps) {
  const currentTab = tabs.find((tab) => tab.value === activeTab) ?? tabs[0];

  return (
    <div className="ui-tabs">
      <div className="ui-tabs-list" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.value === activeTab;

          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`ui-tab ${isActive ? "ui-tab-active" : ""}`}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="ui-tab-panel" role="tabpanel">
        {currentTab?.content}
      </div>
    </div>
  );
}

export default Tabs;