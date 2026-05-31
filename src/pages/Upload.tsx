import { useState } from "react";
import { UploadDropzone } from "../components/upload/UploadDropzone";
import { UploadProgress } from "../components/upload/UploadProgress";
import { useDocumentContext } from "../context/DocumentContext";
import type { Document, DocumentFileType } from "../types/document";

function getFileType(fileName: string): DocumentFileType {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (extension === "pdf") {
    return "PDF";
  }

  if (extension === "csv") {
    return "CSV";
  }

  return "TXT";
}

export function Upload() {
  const { addDocument } = useDocumentContext();

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleFileSelect(file: File) {
    setSelectedFileName(file.name);
    setProgress(0);
    setIsUploading(true);
    setSuccessMessage(null);

    let currentProgress = 0;

    const intervalId = window.setInterval(() => {
      currentProgress += 20;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        window.clearInterval(intervalId);

        const newDocument: Document = {
          id: `doc-${Date.now()}`,
          fileName: file.name,
          fileType: getFileType(file.name),
          fileSize: file.size,
          uploadedAt: new Date().toISOString(),
          status: "UPLOADED",
          metadata: {},
          processingLogs: [
            {
              id: `log-${Date.now()}`,
              timestamp: new Date().toISOString(),
              status: "UPLOADED",
              message: "Document uploaded locally.",
            },
          ],
        };

        addDocument(newDocument);
        setIsUploading(false);
        setSuccessMessage("Document uploaded successfully.");
      }
    }, 300);
  }

  return (
    <section className="space-y-7">
      <div>
        <p className="page-eyebrow">New document</p>
        <h2 className="page-title">Upload workspace</h2>
        <p className="page-description">
          Add PDF, TXT, or CSV files to the local document workflow.
        </p>
      </div>

      <UploadDropzone onFileSelect={handleFileSelect} />

      {selectedFileName && (
        <div className="surface-panel border-l-4 border-l-[#e1a33e] p-4">
          <p className="text-sm font-semibold text-[#253532]">
            Selected file: {selectedFileName}
          </p>

          {isUploading && (
            <p className="mt-1 text-sm text-[#74807c]">
              Uploading file locally...
            </p>
          )}

          {successMessage && (
            <p className="mt-1 text-sm font-semibold text-[#387247]">
              {successMessage}
            </p>
          )}
        </div>
      )}

      {(isUploading || progress > 0) && <UploadProgress progress={progress} />}
    </section>
  );
}
