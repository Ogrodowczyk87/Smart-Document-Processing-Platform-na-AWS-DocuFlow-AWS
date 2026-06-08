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
  console.log("Getting document by id:", request.documentId);

  return {
    document: null,
  };
}
