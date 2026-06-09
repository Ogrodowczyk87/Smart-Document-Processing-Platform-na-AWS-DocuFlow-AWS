import { startProcessing } from "../services/processingService.js";
import type { Document } from "../types/document.js";

type StartProcessingRequest = {
  documentId: string;
};

type StartProcessingResponse = {
  document: Document | null;
  message: string;
};

export async function handler(
  request: StartProcessingRequest,
): Promise<StartProcessingResponse> {
  return startProcessing(request.documentId);
}
