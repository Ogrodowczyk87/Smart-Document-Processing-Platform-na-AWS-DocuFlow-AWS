import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#17211f]">
      <Sidebar />
      <div className="min-h-screen lg:pl-72">
        <Topbar />
        <main className="mx-auto max-w-[1560px] px-4 py-7 sm:px-6 lg:px-10 lg:py-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
