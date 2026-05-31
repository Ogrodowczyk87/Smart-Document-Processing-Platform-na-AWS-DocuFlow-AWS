type UploadProgressProps = {
  progress: number;
};

export function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className="surface-panel p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#344541]">
          Upload progress
        </p>
        <p className="text-sm font-semibold text-[#087f75]">{progress}%</p>
      </div>

      <div className="h-2 bg-[#e8e2d7]">
        <div
          className="h-2 bg-[#0b756d] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
