import { createContext, useContext, useState } from "react";
import { mockDocuments } from "../data/mockDocuments";
import type { Document, DocumentStatus } from "../types/document";

type DocumentContextValue = {
  documents: Document[];
  addDocument: (document: Document) => void;
  updateDocumentStatus: (id: string, status: DocumentStatus) => void;
  startProcessing: (id: string) => void;
};

const DocumentContext = createContext<DocumentContextValue | null>(null);

type DocumentProviderProps = {
  children: React.ReactNode;
};

export function DocumentProvider({ children }: DocumentProviderProps) {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);

  function addDocument(document: Document) {
    setDocuments((currentDocuments) => [document, ...currentDocuments]);
  }

  function updateDocumentStatus(id: string, status: DocumentStatus) {
    setDocuments((currentDocuments) =>
      currentDocuments.map((document) =>
        document.id === id
          ? {
              ...document,
              status,
              processingLogs: [
                ...document.processingLogs,
                {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  status,
                  message: `Document status changed to ${status}.`,
                },
              ],
            }
          : document,
      ),
    );
  }

  function startProcessing(id: string) {
    const shouldFail = Math.random() < 0.1;

    window.setTimeout(() => {
      updateDocumentStatus(id, "VALIDATING");
    }, 700);

    window.setTimeout(() => {
      updateDocumentStatus(id, "EXTRACTING_METADATA");
    }, 1400);

    window.setTimeout(() => {
      updateDocumentStatus(id, "PROCESSING");
    }, 2100);

    window.setTimeout(() => {
      updateDocumentStatus(id, shouldFail ? "FAILED" : "COMPLETED");
    }, 3000);
  }

  return (
    <DocumentContext.Provider
      value={{
        documents,
        addDocument,
        updateDocumentStatus,
        startProcessing,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocumentContext() {
  const context = useContext(DocumentContext);

  if (!context) {
    throw new Error("useDocumentContext must be used within DocumentProvider");
  }

  return context;
}