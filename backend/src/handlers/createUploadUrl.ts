type CreateUploadUrlRequest = {
  fileName: string;
  fileType: string;
};

type CreateUploadUrlResponse = {
  uploadUrl: string;
  storageKey: string;
};

export async function handler(
  request: CreateUploadUrlRequest,
): Promise<CreateUploadUrlResponse> {
  const storageKey = `documents/${crypto.randomUUID()}-${request.fileName}`;

  return {
    uploadUrl: `https://example-upload-url.local/${storageKey}`,
    storageKey,
  };
}