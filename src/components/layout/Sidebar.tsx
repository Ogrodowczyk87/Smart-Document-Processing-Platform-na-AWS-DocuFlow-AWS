import { NavLink } from "react-router-dom";
import docuflowLogo from "../../assets/docuflow_aws_logo.svg";

const navigationItems = [
  { label: "Dashboard", path: "/" },
  { label: "Documents", path: "/documents" },
  { label: "Upload", path: "/upload" },
  { label: "Settings", path: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="hidden fixed inset-y-0 left-0 z-20 w-64 border-r border-slate-200 bg-white px-4 py-5 lg:block">
      <div className="mb-8 px-2">
        <img
          src={docuflowLogo}
          alt="DocuFlow AWS"
          className="h-auto w-44"
        />
      </div>

      <nav aria-label="Main navigation" className="space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-sky-50 text-sky-800 ring-1 ring-sky-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
              ].join(" ")
            }
          >
            <span className="flex h-7 w-7 items-center justify-center rounded bg-slate-100 text-xs font-semibold">
              {item.label.charAt(0)}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
