import { describe, expect, it } from "vitest";
import {
  isAllowedFileType,
  validateCreateDocumentRequest,
  validateCreateUploadUrlRequest,
  validateDocumentId,
} from "./validation.js";

describe("validation utils",  () => {
  it("works", () => {
    expect(true).toBe(true);
  });
   it("allows PDF files", () => {
    expect(isAllowedFileType("application/pdf")).toBe(true)
   })
  
});

describe("validation utils", () => {
  it("allows PDF files", () => {
    expect(isAllowedFileType("application/pdf")).toBe(true);
  });
});