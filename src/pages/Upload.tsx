import { useState } from "react";
import { UploadDropzone } from "../components/upload/UploadDropzone";
import { UploadProgress } from "../components/upload/UploadProgress";

export function Upload() {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  function handleFileSelect(file: File) {
    setSelectedFileName(file.name);
    setProgress(100);
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Upload</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add PDF, TXT, or CSV files to the local document workflow.
        </p>
      </div>

      <UploadDropzone onFileSelect={handleFileSelect} />

      {selectedFileName && (
        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-950">
            Selected file: {selectedFileName}
          </p>
        </div>
      )}

      {progress > 0 && <UploadProgress progress={progress} />}
    </section>
  );
}