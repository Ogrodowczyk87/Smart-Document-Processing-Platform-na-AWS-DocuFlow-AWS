export function Dashboard() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-600">
          Overview of document volume, processing status, and storage usage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {["Total Documents", "Processing", "Completed", "Failed", "Storage Used"].map(
          (label) => (
            <div
              key={label}
              className="rounded-md border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">--</p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
