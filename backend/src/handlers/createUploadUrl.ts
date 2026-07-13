import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

import { createUploadUrl } from "../services/storageService.js";
import { validateCreateUploadUrlRequest } from "../utils/validation.js";

type CreateUploadUrlRequest = {
  fileName: string;
  fileType: string;
};

function jsonResponse(
  statusCode: number,
  body: Record<string, unknown>,
): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

function getErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

function parseRequestBody(body: string | undefined): CreateUploadUrlRequest {
  if (!body) {
    throw new Error("Request body is required.");
  }

  const parsedBody = JSON.parse(body) as CreateUploadUrlRequest;

  validateCreateUploadUrlRequest(parsedBody);

  return parsedBody;
}

export async function handler(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  let request: CreateUploadUrlRequest;

  try {
    request = parseRequestBody(event.body);
  } catch (error) {
    return jsonResponse(400, {
      message:
        error instanceof SyntaxError
          ? "Invalid JSON body."
          : getErrorMessage(error, "Invalid request."),
    });
  }

  try {
    const result = await createUploadUrl({
      fileName: request.fileName,
      fileType: request.fileType,
    });

    return jsonResponse(200, result);
  } catch {
    return jsonResponse(500, {
      message: "Failed to create upload URL.",
    });
  }
}