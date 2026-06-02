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
  s3Key: string;
  status: DocumentStatus;
  uploadedAt: string;
  updatedAt: string;
  userId: string;
  metadata?: Record<string, unknown>;
  processingResult?: Record<string, unknown>;
};

export type DocumentFileType = "PDF" | "TXT" | "CSV";

export type DocumentMetadata = {
  pageCount?: number;
  rowCount?: number;
  wordCount?: number;
  language?: string;
  extractedFields?: Record<string, string>;
};

export type ProcessingLog = {
  id: string;
  timestamp: string;
  message: string;
  status: DocumentStatus;
};

export type ProcessingResult = {
  summary?: string;
  extractedText?: string;
  confidence?: number;
};

export type Document = {
  id: string;
  fileName: string;
  fileType: DocumentFileType;
  fileSize: number;
  uploadedAt: string;
  status: DocumentStatus;
  metadata: DocumentMetadata;
  processingLogs: ProcessingLog[];
  processingResult?: ProcessingResult;
};