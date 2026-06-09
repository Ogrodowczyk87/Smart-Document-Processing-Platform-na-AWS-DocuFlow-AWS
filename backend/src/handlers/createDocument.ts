import { createDocument } from "../services/documentService.js";
import type { Document } from "../types/document.js";

type CreateDocumentRequest = {
  fileName: string;
  fileType: string;
  fileSize: number;
  storageKey: string;
  userId: string;
};

type CreateDocumentResponse = {
  document: Document;
};

export async function handler(
  request: CreateDocumentRequest,
): Promise<CreateDocumentResponse> {
  return {
    document: createDocument({
      fileName: request.fileName,
      fileType: request.fileType,
      fileSize: request.fileSize,
      storageKey: request.storageKey,
      userId: request.userId,
      metadata: {},
      processingResult: {},
    }),
  };
}
