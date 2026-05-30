type UploadProgressProps = {
  progress: number;
};

export function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-950">Upload progress</p>
        <p className="text-sm font-medium text-slate-600">{progress}%</p>
      </div>

      <div className="h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-sky-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
