import type { DocumentStatus } from "../types/document";

export function getStatusLabel(status: DocumentStatus) {
  const labels: Record<DocumentStatus, string> = {
    UPLOADED: "Uploaded",
    VALIDATING: "Validating",
    EXTRACTING_METADATA: "Extracting metadata",
    PROCESSING: "Processing",
    COMPLETED: "Completed",
    FAILED: "Failed",
  };

  return labels[status];
}

export function getStatusColorClasses(status: DocumentStatus) {
  const colors: Record<DocumentStatus, string> = {
    UPLOADED: "bg-yellow-50 text-yellow-800 ring-yellow-200",
    VALIDATING: "bg-blue-50 text-blue-800 ring-blue-200",
    EXTRACTING_METADATA: "bg-purple-50 text-purple-800 ring-purple-200",
    PROCESSING: "bg-blue-50 text-blue-800 ring-blue-200",
    COMPLETED: "bg-green-50 text-green-800 ring-green-200",
    FAILED: "bg-red-50 text-red-800 ring-red-200",
  };

  return colors[status];
}