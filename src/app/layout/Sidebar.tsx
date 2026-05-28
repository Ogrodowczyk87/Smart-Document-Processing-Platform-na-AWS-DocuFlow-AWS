import type { Page } from "./page.types";

type SidebarProps = {
  activePage: Page;
  onPageChange: (page: Page) => void;
};

const tabs: Page[] = ["Dashboard", "Documents", "Upload Document"];

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 p-4">
      <nav aria-label="Nawigacja glowna" className="space-y-2">
        {tabs.map((tab) => {
          const isActive = tab === activePage;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onPageChange(tab)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? "bg-sky-100 text-sky-800 ring-1 ring-sky-200 hover:bg-sky-200"
                  : "text-slate-600 hover:bg-white hover:text-slate-950"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold ${
                  isActive
                    ? "bg-sky-500 text-white"
                    : "bg-white text-slate-500 ring-1 ring-slate-200"
                }`}
              >
                {tab.charAt(0)}
              </span>
              <span>{tab}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
