type StartProcessingRequest = {
  documentId: string;
};

type StartProcessingResponse = {
  documentId: string;
  status: "PROCESSING";
  message: string;
};

export async function handler(
  request: StartProcessingRequest,
): Promise<StartProcessingResponse> {
  console.log("Starting processing for document:", request.documentId);

  return {
    documentId: request.documentId,
    status: "PROCESSING",
    message: "Processing workflow started.",
  };
}