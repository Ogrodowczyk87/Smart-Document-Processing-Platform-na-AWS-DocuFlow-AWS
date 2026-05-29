import type { Document } from "../types/document";

export const mockDocuments: Document[] = [
  {
    id: "doc-001",
    fileName: "invoice_may_2026.pdf",
    fileType: "PDF",
    fileSize: 1240000,
    uploadedAt: "2026-05-20T10:30:00Z",
    status: "COMPLETED",
    metadata: {
      pageCount: 2,
      wordCount: 840,
      language: "en",
      extractedFields: {
        invoiceNumber: "INV-2026-05",
        vendor: "Acme Corp",
        totalAmount: "1299.00 USD",
      },
    },
    processingLogs: [
      {
        id: "log-001",
        timestamp: "2026-05-20T10:31:00Z",
        status: "UPLOADED",
        message: "Document uploaded successfully.",
      },
      {
        id: "log-002",
        timestamp: "2026-05-20T10:32:00Z",
        status: "COMPLETED",
        message: "Document processing completed.",
      },
    ],
    processingResult: {
      summary: "Invoice from Acme Corp for 1299.00 USD.",
      confidence: 0.96,
    },
  },
  {
    id: "doc-002",
    fileName: "contract.pdf",
    fileType: "PDF",
    fileSize: 2480000,
    uploadedAt: "2026-05-21T14:10:00Z",
    status: "PROCESSING",
    metadata: {
      pageCount: 14,
      wordCount: 6200,
      language: "en",
    },
    processingLogs: [
      {
        id: "log-003",
        timestamp: "2026-05-21T14:11:00Z",
        status: "UPLOADED",
        message: "Document uploaded successfully.",
      },
      {
        id: "log-004",
        timestamp: "2026-05-21T14:13:00Z",
        status: "PROCESSING",
        message: "Document processing started.",
      },
    ],
  },
  {
    id: "doc-003",
    fileName: "employee_data.csv",
    fileType: "CSV",
    fileSize: 780000,
    uploadedAt: "2026-05-22T09:15:00Z",
    status: "EXTRACTING_METADATA",
    metadata: {
      rowCount: 420,
      language: "en",
      extractedFields: {
        columns: "employeeId,name,email,department,startDate",
      },
    },
    processingLogs: [
      {
        id: "log-005",
        timestamp: "2026-05-22T09:16:00Z",
        status: "UPLOADED",
        message: "CSV file uploaded successfully.",
      },
      {
        id: "log-006",
        timestamp: "2026-05-22T09:17:00Z",
        status: "EXTRACTING_METADATA",
        message: "Extracting CSV metadata.",
      },
    ],
  },
  {
    id: "doc-004",
    fileName: "meeting_notes.txt",
    fileType: "TXT",
    fileSize: 64000,
    uploadedAt: "2026-05-23T16:45:00Z",
    status: "UPLOADED",
    metadata: {
      wordCount: 1200,
      language: "en",
    },
    processingLogs: [
      {
        id: "log-007",
        timestamp: "2026-05-23T16:45:00Z",
        status: "UPLOADED",
        message: "Text file uploaded successfully.",
      },
    ],
  },
  {
    id: "doc-005",
    fileName: "report.csv",
    fileType: "CSV",
    fileSize: 1560000,
    uploadedAt: "2026-05-24T11:05:00Z",
    status: "FAILED",
    metadata: {
      rowCount: 980,
      language: "en",
      extractedFields: {
        columns: "date,region,revenue,cost,margin",
      },
    },
    processingLogs: [
      {
        id: "log-008",
        timestamp: "2026-05-24T11:06:00Z",
        status: "UPLOADED",
        message: "CSV file uploaded successfully.",
      },
      {
        id: "log-009",
        timestamp: "2026-05-24T11:08:00Z",
        status: "FAILED",
        message: "Processing failed during validation.",
      },
    ],
  },
];