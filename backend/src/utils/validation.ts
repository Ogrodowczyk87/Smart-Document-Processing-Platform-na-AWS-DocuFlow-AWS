const allowedFileTypes = ["application/pdf", "text/plain", "text/csv"];

export function isAllowedFileType(fileType: string): boolean {
  return allowedFileTypes.includes(fileType);
}

export function validateDocumentId(documentId: string): void {
  if (!documentId) {
    throw new Error("documentId is required.");
  }
}

export function validateCreateDocumentRequest(input: {
  fileName: string;
  fileType: string;
  fileSize: number;
  storageKey: string;
  userId: string;
}): void {
  if (!input.fileName) {
    throw new Error("fileName is required.");
  }

  if (!input.fileType) {
    throw new Error("fileType is required.");
  }

  if (!isAllowedFileType(input.fileType)) {
    throw new Error("Unsupported file type.");
  }

  if (!input.fileSize || input.fileSize <= 0) {
    throw new Error("fileSize must be greater than 0.");
  }

  if (!input.storageKey) {
    throw new Error("storageKey is required.");
  }

  if (!input.userId) {
    throw new Error("userId is required.");
  }
}