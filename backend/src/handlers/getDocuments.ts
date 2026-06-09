import { listDocuments } from "../services/documentService.js";
import type { Document } from "../types/document.js";

type GetDocumentsResponse = {
  documents: Document[];
};

export async function handler(): Promise<GetDocumentsResponse> {
  return {
    documents: listDocuments(),
  };
}