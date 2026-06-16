import { getDocumentById } from "../services/documentService.js";
import type { Document } from "../types/document.js";
import { validateDocumentId } from "../utils/validation.js";

type GetDocumentByIdRequest = {
  documentId: string;
};

type GetDocumentByIdResponse = {
  document: Document | null;
};

export async function handler(
  request: GetDocumentByIdRequest,
): Promise<GetDocumentByIdResponse> {
  validateDocumentId(request.documentId);

  return {
    document: getDocumentById(request.documentId),
  };
}
