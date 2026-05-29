export function Upload() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Upload</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add PDF, TXT, or CSV files to the local document workflow.
        </p>
      </div>

      <div className="rounded-md border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-medium text-slate-700">Upload dropzone</p>
        <p className="mt-2 text-sm text-slate-500">
          Drag and drop validation will be added in the upload stage.
        </p>
      </div>
    </section>
  );
}
