import { updateDocumentStatus } from "../services/documentService.js";
import type { Document } from "../types/document.js";

type StartProcessingRequest = {
  documentId: string;
};

type StartProcessingResponse = {
  document: Document | null;
  message: string;
};

export async function handler(
  request: StartProcessingRequest,
): Promise<StartProcessingResponse> {
  const document = updateDocumentStatus(request.documentId, "PROCESSING");

  return {
    document,
    message: document
      ? "Processing workflow started."
      : "Document not found.",
  };
}
