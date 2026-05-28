import type { Page } from "../app/layout/page.types";
import { Dashboard } from "./Dashboard";
import { Documents } from "./Documents";
import { UploadDocument } from "./UploadDocument";

type ContentProps = {
  activePage: Page;
};

export function Content({ activePage }: ContentProps) {
  return (
    <section className="flex-1 bg-white p-6">
      {activePage === "Dashboard" && <Dashboard />}
      {activePage === "Documents" && <Documents />}
      {activePage === "Upload Document" && <UploadDocument />}
    </section>
  );
}
