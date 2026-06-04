import type { Document } from "../types/document.js";

type CreateDocumentRequest = {
  fileName: string;
  fileType: string;
  fileSize: number;
  storageKey: string;
  userId: string;
};

type CreateDocumentResponse = {
    document: Document
}

export async function handler (
    request: CreateDocumentRequest,
): Promise<CreateDocumentResponse> {
    const now = new Date().toISOString()

    const document: Document = {
        documentId: crypto.randomUUID(),
    fileName: request.fileName,
    fileType: request.fileType,
    fileSize: request.fileSize,
    storageKey: request.storageKey,
    status: "UPLOADED",
    uploadedAt: now,
    updatedAt: now,
    userId: request.userId,
    metadata: {},
    processingResult: {},
    }

    return {
        document,
    }
}