import { NavLink } from "react-router-dom";
import docuflowLogo from "../../assets/docuflow_aws_logo_dark.svg";

const navigationItems = [
  { label: "Dashboard", path: "/" },
  { label: "Documents", path: "/documents" },
  { label: "Upload", path: "/upload" },
  { label: "Settings", path: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-[#31423e] bg-[#172a27] px-5 py-6 text-white lg:flex lg:flex-col">
      <div className="border-b border-white/10 px-2 pb-6">
        <img src={docuflowLogo} alt="DocuFlow AWS" className="h-auto w-full" />
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9bc7c0]">
          Document operations
        </p>
      </div>

      <nav aria-label="Main navigation" className="mt-7 space-y-1">
        {navigationItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 border-l-2 px-3 py-3 text-sm font-medium",
                isActive
                  ? "border-[#f2a93b] bg-white/10 text-white"
                  : "border-transparent text-[#bfd0cd] hover:bg-white/5 hover:text-white",
              ].join(" ")
            }
          >
            <span className="text-[11px] font-bold text-[#f2a93b]">
              0{index + 1}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 px-2 pt-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9bc7c0]">
          Environment
        </p>
        <p className="mt-2 text-sm font-semibold text-white">Local MVP</p>
        <p className="mt-1 text-xs leading-5 text-[#9fb5b1]">
          AWS services are intentionally disconnected.
        </p>
      </div>
    </aside>
  );
}
