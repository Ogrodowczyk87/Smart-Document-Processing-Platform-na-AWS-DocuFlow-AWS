export type DocumentStatus =
  | "UPLOADED"
  | "VALIDATING"
  | "EXTRACTING_METADATA"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export type Document = {
  documentId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  storageKey: string;
  status: DocumentStatus;
  uploadedAt: string;
  updatedAt: string;
  userId: string;
  metadata?: Record<string, unknown>;
  processingResult?: Record<string, unknown>;
};
