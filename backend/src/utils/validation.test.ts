import { describe, expect, it } from "vitest";
import {
  isAllowedFileType,
  validateCreateDocumentRequest,
  validateCreateUploadUrlRequest,
  validateDocumentId,
} from "./validation.js";

describe("isAllowedFileType", () => {
  it("allows PDF files", () => {
    expect(isAllowedFileType("application/pdf")).toBe(true);
  });

  it("rejects unsupported file types", () => {
    expect(isAllowedFileType("image/png")).toBe(false);
  });
});

describe("validateDocumentId", () => {
  it("does not throw when documentId is provided", () => {
    expect(() => validateDocumentId("document-123")).not.toThrow();
  });

  it("throws when documentId is empty", () => {
    expect(() => validateDocumentId("")).toThrow(
      "documentId is required.",
    );
  });
});

describe("validateCreateUploadUrlRequest", () => {
  it("accepts a valid upload request", () => {
    expect(() =>
      validateCreateUploadUrlRequest({
        fileName: "invoice.pdf",
        fileType: "application/pdf",
      }),
    ).not.toThrow();
  });

  it("throws when fileName is empty", () => {
    expect(() =>
      validateCreateUploadUrlRequest({
        fileName: "",
        fileType: "application/pdf",
      }),
    ).toThrow("fileName is required.");
  });

  it("throws when file type is unsupported", () => {
    expect(() =>
      validateCreateUploadUrlRequest({
        fileName: "image.png",
        fileType: "image/png",
      }),
    ).toThrow("Unsupported file type.");
  });
});

describe("validateCreateDocumentRequest", () => {
  const validRequest = {
    fileName: "invoice.pdf",
    fileType: "application/pdf",
    fileSize: 1024,
    storageKey: "documents/invoice.pdf",
    userId: "user-123",
  };

  it("accepts a valid document request", () => {
    expect(() =>
      validateCreateDocumentRequest(validRequest),
    ).not.toThrow();
  });

  it("throws when fileName is empty", () => {
    expect(() =>
      validateCreateDocumentRequest({
        ...validRequest,
        fileName: "",
      }),
    ).toThrow("fileName is required.");
  });

  it("throws when fileSize is invalid", () => {
    expect(() =>
      validateCreateDocumentRequest({
        ...validRequest,
        fileSize: 0,
      }),
    ).toThrow("fileSize must be greater than 0.");
  });

  it("throws when storageKey is empty", () => {
    expect(() =>
      validateCreateDocumentRequest({
        ...validRequest,
        storageKey: "",
      }),
    ).toThrow("storageKey is required.");
  });

  it("throws when userId is empty", () => {
    expect(() =>
      validateCreateDocumentRequest({
        ...validRequest,
        userId: "",
      }),
    ).toThrow("userId is required.");
  });
});