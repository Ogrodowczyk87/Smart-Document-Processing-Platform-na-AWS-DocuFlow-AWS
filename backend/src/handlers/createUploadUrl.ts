import { createUploadUrl } from "../services/storageService.js";
import { validateCreateUploadUrlRequest } from "../utils/validation.js";

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
  validateCreateUploadUrlRequest(request);

  return createUploadUrl({
    fileName: request.fileName,
    fileType: request.fileType,
  });
}
