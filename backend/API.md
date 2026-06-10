# Backend API Contract

This document describes the planned API endpoints for the DocuFlow backend.

The current backend implementation is local and mock-based. These endpoints will later be exposed through Amazon API Gateway and handled by AWS Lambda functions.

## Endpoints

```txt
POST /upload-url
POST /documents
GET /documents
GET /documents/{documentId}
POST /documents/{documentId}/process
```

## POST /upload-url

Creates a presigned upload URL for a document file.

### Request

```json
{
  "fileName": "invoice_may_2026.pdf",
  "fileType": "application/pdf"
}
```

### Response

```json
{
  "uploadUrl": "https://example-upload-url.local/documents/example-id-invoice_may_2026.pdf",
  "storageKey": "documents/example-id-invoice_may_2026.pdf"
}
```

## POST /documents

Creates a document metadata record after the file upload step.

### Request

```json
{
  "fileName": "invoice_may_2026.pdf",
  "fileType": "application/pdf",
  "fileSize": 245760,
  "storageKey": "documents/example-id-invoice_may_2026.pdf",
  "userId": "demo-user"
}
```

### Response

```json
{
  "document": {
    "documentId": "doc-123",
    "fileName": "invoice_may_2026.pdf",
    "fileType": "application/pdf",
    "fileSize": 245760,
    "storageKey": "documents/example-id-invoice_may_2026.pdf",
    "status": "UPLOADED",
    "uploadedAt": "2026-06-10T10:00:00.000Z",
    "updatedAt": "2026-06-10T10:00:00.000Z",
    "userId": "demo-user",
    "metadata": {},
    "processingResult": {}
  }
}
```

## GET /documents

Returns all documents for the current user.

### Response

```json
{
  "documents": []
}
```

## GET /documents/{documentId}

Returns one document by ID.

### Response

```json
{
  "document": null
}
```

If the document exists, `document` contains the document object. If not, it returns `null`.

## POST /documents/{documentId}/process

Starts document processing.

### Response

```json
{
  "document": {
    "documentId": "doc-123",
    "status": "PROCESSING"
  },
  "message": "Processing workflow started."
}
```

If the document does not exist:

```json
{
  "document": null,
  "message": "Document not found."
}
```

## Future AWS Mapping

```txt
POST /upload-url                     -> createUploadUrl Lambda -> S3 presigned URL
POST /documents                      -> createDocument Lambda -> DynamoDB
GET /documents                       -> getDocuments Lambda -> DynamoDB
GET /documents/{documentId}          -> getDocumentById Lambda -> DynamoDB
POST /documents/{documentId}/process -> startProcessing Lambda -> Step Functions
```
