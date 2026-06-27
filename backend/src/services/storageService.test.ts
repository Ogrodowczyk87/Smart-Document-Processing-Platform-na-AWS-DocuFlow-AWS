import { describe, expect, it } from "vitest";
import { createUploadUrl } from "./storageService.js";

describe("createUploadUrl", () => {
  const validInput = {
    fileName: "invoice.pdf",
    fileType: "application/pdf",
  };

  it("creates a storage key for the file", () => {
    const result = createUploadUrl(validInput);

    expect(result.storageKey).toContain("invoice.pdf");
    expect(result.storageKey.startsWith("documents/")).toBe(true);
  });

  it("returns an upload URL containing the storage key", () => {
    const result = createUploadUrl(validInput);

    expect(result.uploadUrl).toContain(result.storageKey);
    expect(result.uploadUrl.startsWith("https://")).toBe(true);
  });
});