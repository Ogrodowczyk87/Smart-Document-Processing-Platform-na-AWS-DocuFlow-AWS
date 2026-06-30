import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({});
const UPLOAD_URL_EXPIRATION_SECONDS = 300;

type CreateUploadUrlInput = {
  fileName: string;
  fileType: string;
};

type CreateUploadUrlResult = {
  uploadUrl: string;
  storageKey: string;
};

export async function createUploadUrl(
  input: CreateUploadUrlInput,
): Promise<CreateUploadUrlResult> {
  const bucketName = process.env.DOCUMENTS_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("DOCUMENTS_BUCKET_NAME is required.");
  }

  const storageKey =
    `documents/${crypto.randomUUID()}-${input.fileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: storageKey,
    ContentType: input.fileType,
  });

  const uploadUrl = await getSignedUrl(
    s3Client,
    command,
    {
      expiresIn: UPLOAD_URL_EXPIRATION_SECONDS,
    },
  );

  return {
    uploadUrl,
    storageKey,
  };
}