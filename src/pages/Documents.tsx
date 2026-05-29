import { Link } from "react-router-dom";

export function Documents() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Documents</h2>
          <p className="mt-1 text-sm text-slate-600">
            Browse uploaded files and inspect processing status.
          </p>
        </div>
        <Link
          to="/upload"
          className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Upload document
        </Link>
      </div>

      <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        Documents table will be connected to mock data in the next stage.
      </div>
    </section>
  );
}
