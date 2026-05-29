import { createContext, useContext, useState } from "react";
import { mockDocuments } from "../data/mockDocuments";
import type { Document } from "../types/document";

type DocumentContextValue = {
  documents: Document[];
};

const DocumentContext = createContext<DocumentContextValue | null>(null);

type DocumentProviderProps = {
  children: React.ReactNode;
};

export function DocumentProvider({ children }: DocumentProviderProps) {
  const [documents] = useState<Document[]>(mockDocuments);

  return (
    <DocumentContext.Provider value={{ documents }}>
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