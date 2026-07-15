import { useState } from "react";
import { UploadDropzone } from "../components/upload/UploadDropzone";
import { UploadProgress } from "../components/upload/UploadProgress";
import { useDocumentContext } from "../context/DocumentContext";
import {
  createUploadUrl,
  uploadFileToS3,
} from "../services/documentService";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleFileSelect(file: File) {
    setSelectedFileName(file.name);
    setProgress(0);
    setIsUploading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      setProgress(20);

      const { uploadUrl, storageKey } = await createUploadUrl({
        fileName: file.name,
        fileType: file.type,
      });

      setProgress(60);

      await uploadFileToS3(uploadUrl, file);

      setProgress(100);

      const now = new Date().toISOString();

      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        fileName: file.name,
        fileType: getFileType(file.name),
        fileSize: file.size,
        s3Key: storageKey,
        uploadedAt: now,
        status: "UPLOADED",
        metadata: {},
        processingLogs: [
          {
            id: `log-${Date.now()}`,
            timestamp: now,
            status: "UPLOADED",
            message: `Document uploaded to S3: ${storageKey}`,
          },
        ],
      };

      addDocument(newDocument);
      setSuccessMessage("Document uploaded to S3 successfully.");
    } catch (error) {
      setProgress(0);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Upload failed.");
      }
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section className="space-y-7">
      <div>
        <p className="page-eyebrow">New document</p>
        <h2 className="page-title">Upload workspace</h2>
        <p className="page-description">
          Add PDF, TXT, or CSV files to the document workflow.
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
              Uploading file to S3...
            </p>
          )}

          {successMessage && (
            <p className="mt-1 text-sm font-semibold text-[#387247]">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="mt-1 text-sm font-semibold text-red-600">
              {errorMessage}
            </p>
          )}
        </div>
      )}

      {(isUploading || progress > 0) && <UploadProgress progress={progress} />}
    </section>
  );
}
