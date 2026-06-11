import { createUploadUrl } from "../services/storageService.js";
import { isAllowedFileType } from "../utils/validation.js";

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
  if (!request.fileName) {
    throw new Error("fileName is required.");
  }

  if (!request.fileType) {
    throw new Error("fileType is required.");
  }

  if (!isAllowedFileType(request.fileType)) {
    throw new Error("Unsupported file type.");
  }

  return createUploadUrl({
    fileName: request.fileName,
    fileType: request.fileType,
  });
}