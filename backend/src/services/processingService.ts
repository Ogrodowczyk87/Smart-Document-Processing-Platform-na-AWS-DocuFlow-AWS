import { updateDocumentStatus } from "./documentService.js";
import type { Document } from "../types/document.js";

type StartProcessingResult = {
  document: Document | null;
  message: string;
};

export function startProcessing(documentId: string): StartProcessingResult {
  const document = updateDocumentStatus(documentId, "PROCESSING");

  return {
    document,
    message: document
      ? "Processing workflow started."
      : "Document not found.",
  };
}