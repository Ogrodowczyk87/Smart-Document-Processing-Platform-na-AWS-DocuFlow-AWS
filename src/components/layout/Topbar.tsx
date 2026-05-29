import { NavLink } from "react-router-dom";

const mobileNavigationItems = [
  { label: "Dashboard", path: "/" },
  { label: "Documents", path: "/documents" },
  { label: "Upload", path: "/upload" },
  { label: "Settings", path: "/settings" },
];

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-950">DocuFlow</p>
          <p className="text-xs text-slate-500">Local frontend MVP</p>
        </div>
        <div className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
          AWS disabled
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden"
      >
        {mobileNavigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              [
                "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium",
                isActive
                  ? "bg-sky-50 text-sky-800"
                  : "text-slate-600 hover:bg-slate-50",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
