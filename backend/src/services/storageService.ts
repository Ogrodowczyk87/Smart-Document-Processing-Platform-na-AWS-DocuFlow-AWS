type CreateUploadUrlInput = {
  fileName: string;
  fileType: string;
};

type CreateUploadUrlResult = {
  uploadUrl: string;
  storageKey: string;
};

export function createUploadUrl(
  input: CreateUploadUrlInput,
): CreateUploadUrlResult {
  const storageKey = `documents/${crypto.randomUUID()}-${input.fileName}`;

  return {
    uploadUrl: `https://example-upload-url.local/${storageKey}`,
    storageKey,
  };
}