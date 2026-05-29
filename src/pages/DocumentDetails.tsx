import { Link, useParams } from "react-router-dom";

export function DocumentDetails() {
  const { id } = useParams();

  return (
    <section className="space-y-6">
      <div>
        <Link to="/documents" className="text-sm font-medium text-sky-700">
          Back to documents
        </Link>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">
          Document Details
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Document ID: {id ?? "unknown"}
        </p>
      </div>

      <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        Metadata, logs, result, and timeline will be added after mock data.
      </div>
    </section>
  );
}
