import { createUploadUrl } from "../services/storageService.js";

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
  return createUploadUrl({
    fileName: request.fileName,
    fileType: request.fileType,
  });
}
