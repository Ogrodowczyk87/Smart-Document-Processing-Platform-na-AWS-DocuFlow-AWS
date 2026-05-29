import { mockDocuments } from "../data/mockDocuments";

export function useDocuments() {
  const documents = mockDocuments;

  const totalDocuments = documents.length;

  const processingDocuments = documents.filter((document) =>
    ["VALIDATING", "EXTRACTING_METADATA", "PROCESSING"].includes(document.status),
  ).length;

  const completedDocuments = documents.filter(
    (document) => document.status === "COMPLETED",
  ).length;

  const failedDocuments = documents.filter(
    (document) => document.status === "FAILED",
  ).length;

  const storageUsed = documents.reduce(
    (total, document) => total + document.fileSize,
    0,
  );

  return {
    documents,
    totalDocuments,
    processingDocuments,
    completedDocuments,
    failedDocuments,
    storageUsed,
  };
}