# DocuFlow Backend

Backend for the DocuFlow AWS smart document processing platform.

This folder currently contains a TypeScript backend scaffold with mock service logic. It is intentionally not connected to AWS yet. The goal is to prepare a clean backend structure before replacing the mock services with S3, DynamoDB, API Gateway, Lambda, and Step Functions.

## Current Structure

```txt
backend/
  src/
    handlers/
      createUploadUrl.ts
      createDocument.ts
      getDocuments.ts
      getDocumentById.ts
      startProcessing.ts

    services/
      documentService.ts
      storageService.ts
      processingService.ts

    types/
      document.ts

  package.json
  tsconfig.json
```

## Handlers

Handlers represent future API entry points. In AWS, these will become Lambda handlers connected to API Gateway.

```txt
createUploadUrl.ts    Creates a mock upload URL and storage key.
createDocument.ts     Creates a document record.
getDocuments.ts       Returns all documents.
getDocumentById.ts    Returns one document by documentId.
startProcessing.ts    Starts mock document processing.
```

## Services

Services contain backend logic used by handlers.

```txt
documentService.ts    Temporary in-memory document storage and status updates.
storageService.ts     Mock upload URL generation. Later replaced with S3 presigned URLs.
processingService.ts  Mock processing start. Later replaced with Step Functions execution.
```

## Current Mock Flow

```txt
Frontend requests upload URL
Backend returns mock uploadUrl and storageKey
Frontend creates document metadata
Backend creates document with UPLOADED status
Frontend starts processing
Backend updates document status to PROCESSING
```

## Future AWS Integration

The mock services will later be replaced with real AWS services:

```txt
storageService.ts     Amazon S3 presigned upload URLs
documentService.ts    DynamoDB document records
processingService.ts  AWS Step Functions workflow execution
handlers/             AWS Lambda functions behind API Gateway
```

## Local Typecheck

From the repository root:

```bash
npx tsc -p backend/tsconfig.json --noEmit
```

From inside the backend folder:

```bash
npx tsc -p tsconfig.json --noEmit
```
