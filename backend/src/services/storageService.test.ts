import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createUploadUrl } from "./storageService.js";

vi.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: vi.fn(),
}));

const mockedGetSignedUrl = vi.mocked(getSignedUrl);

describe("createUploadUrl", () => {
  const validInput = {
    fileName: "invoice.pdf",
    fileType: "application/pdf",
  };

  beforeEach(() => {
    process.env.DOCUMENTS_BUCKET_NAME =
      "test-documents-bucket";

    mockedGetSignedUrl.mockResolvedValue(
      "https://signed-upload-url.example",
    );
  });

  afterEach(() => {
    delete process.env.DOCUMENTS_BUCKET_NAME;
    vi.clearAllMocks();
  });

  it("creates a storage key for the file", async () => {
    const result = await createUploadUrl(validInput);

    expect(result.storageKey).toContain("invoice.pdf");
    expect(
      result.storageKey.startsWith("documents/"),
    ).toBe(true);
  });

  it("returns a signed upload URL", async () => {
    const result = await createUploadUrl(validInput);

    expect(result.uploadUrl).toBe(
      "https://signed-upload-url.example",
    );
    expect(mockedGetSignedUrl).toHaveBeenCalledOnce();
  });

  it("throws when bucket name is missing", async () => {
    delete process.env.DOCUMENTS_BUCKET_NAME;

    await expect(
      createUploadUrl(validInput),
    ).rejects.toThrow(
      "DOCUMENTS_BUCKET_NAME is required.",
    );
  });
});