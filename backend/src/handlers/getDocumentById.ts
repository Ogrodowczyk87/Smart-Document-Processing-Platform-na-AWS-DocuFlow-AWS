import { getDocumentById } from "../services/documentService.js";
import type { Document } from "../types/document.js";

type GetDocumentByIdRequest = {
  documentId: string;
};

type GetDocumentByIdResponse = {
  document: Document | null;
};

export async function handler(
  request: GetDocumentByIdRequest,
): Promise<GetDocumentByIdResponse> {
  return {
    document: getDocumentById(request.documentId),
  };
}
