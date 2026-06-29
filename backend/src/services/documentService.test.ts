import { describe, expect, it } from "vitest";
import {
  createDocument,
  updateDocumentStatus,
} from "./documentService.js";

describe("documentService", () => {
  const validInput = {
    fileName: "invoice.pdf",
    fileType: "application/pdf",
    fileSize: 1024,
    storageKey: "documents/invoice.pdf",
    userId: "user-123",
    metadata: {},
    processingResult: {},
  };

  it("creates a document with UPLOADED status", () => {
    const document = createDocument(validInput);

    expect(document.fileName).toBe("invoice.pdf");
    expect(document.status).toBe("UPLOADED");
    expect(document.documentId).not.toBe("");
  });

  it("updates the document status", () => {
    const document = createDocument(validInput);

    const updatedDocument = updateDocumentStatus(
      document.documentId,
      "PROCESSING",
    );

    expect(updatedDocument).not.toBeNull();
    expect(updatedDocument?.status).toBe("PROCESSING");
  });

  it("returns null when the document does not exist", () => {
    const result = updateDocumentStatus(
      "unknown-document",
      "PROCESSING",
    );

    expect(result).toBeNull();
  });
});