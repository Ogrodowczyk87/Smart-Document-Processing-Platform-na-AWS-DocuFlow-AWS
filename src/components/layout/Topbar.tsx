import { NavLink } from "react-router-dom";
import docuflowLogo from "../../assets/docuflow_aws_logo.svg";

const mobileNavigationItems = [
  { label: "Dashboard", path: "/" },
  { label: "Documents", path: "/documents" },
  { label: "Upload", path: "/upload" },
  { label: "Settings", path: "/settings" },
];

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-[#ded9cf] bg-[#fffefa]/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <img
            src={docuflowLogo}
            alt="DocuFlow AWS"
            className="h-auto w-32 sm:w-40 lg:hidden"
          />
          <div className="hidden lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087f75]">
              Operations console
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[#344541]">
              Smart document processing
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 border border-[#ddd6c8] bg-[#f8f5ee] px-3 py-1.5 text-xs font-semibold text-[#6b6254]">
          <span className="h-2 w-2 rounded-full bg-[#e1a33e]" />
          Local mode
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="flex gap-1 overflow-x-auto border-t border-[#eeeae2] px-4 py-2 lg:hidden"
      >
        {mobileNavigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              [
                "whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium",
                isActive
                  ? "border-[#0b756d] text-[#075d57]"
                  : "border-transparent text-[#62706d] hover:text-[#17211f]",
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
