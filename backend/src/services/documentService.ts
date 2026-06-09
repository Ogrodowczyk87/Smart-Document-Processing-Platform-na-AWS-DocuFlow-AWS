import type { Document, DocumentStatus } from "../types/document.js";

type CreateDocumentInput = Omit<
  Document,
  "documentId" | "status" | "uploadedAt" | "updatedAt"
>;

const documents: Document[] = [];

function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

export function listDocuments(): Document[] {
  return documents;
}

export function getDocumentById(documentId: string): Document | null {
  return (
    documents.find((document) => document.documentId === documentId) ?? null
  );
}

export function createDocument(input: CreateDocumentInput): Document {
  const now = getCurrentTimestamp();

  const document: Document = {
    ...input,
    documentId: crypto.randomUUID(),
    status: "UPLOADED",
    uploadedAt: now,
    updatedAt: now,
  };

  documents.unshift(document);

  return document;
}

export function updateDocumentStatus(
  documentId: string,
  status: DocumentStatus,
): Document | null {
  const documentIndex = documents.findIndex(
    (document) => document.documentId === documentId,
  );

  if (documentIndex === -1) {
    return null;
  }

  const updatedDocument: Document = {
    ...documents[documentIndex],
    status,
    updatedAt: getCurrentTimestamp(),
  };

  documents[documentIndex] = updatedDocument;

  return updatedDocument;
}
