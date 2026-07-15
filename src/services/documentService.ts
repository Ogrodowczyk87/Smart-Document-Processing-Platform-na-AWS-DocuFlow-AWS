type CreateUploadUrlInput = {
  fileName: string;
  fileType: string;
};

type CreateUploadUrlResponse = {
  uploadUrl: string;
  storageKey: string;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const createUploadUrl = async (
  input: CreateUploadUrlInput,
): Promise<CreateUploadUrlResponse> => {
  const response = await fetch(`${apiBaseUrl}/upload-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create upload URL.");
  }

  return response.json() as Promise<CreateUploadUrlResponse>;
};

export const uploadFileToS3 = async (
  uploadUrl: string,
  file: File,
): Promise<void> => {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file to S3.");
  }
};