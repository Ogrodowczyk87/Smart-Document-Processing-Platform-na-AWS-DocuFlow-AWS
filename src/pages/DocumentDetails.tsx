import { Link, useParams } from "react-router-dom";
import { DocumentMetadata } from "../components/documents/DocumentMetadata";
import { DocumentStatusBadge } from "../components/documents/DocumentStatusBadge";
import { DocumentTimeline } from "../components/documents/DocumentTimeline";
import { ProcessingLogs } from "../components/documents/ProcessingLogs";
import { useDocumentContext } from "../context/DocumentContext";
import { useDocuments } from "../hooks/useDocuments";
import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";
import { ProcessingResult } from "../components/documents/ProcessingResult";

export function DocumentDetails() {
  const { id } = useParams();
  const { documents } = useDocuments();
  const { startProcessing } = useDocumentContext();

  const document = documents.find((document) => document.id === id);

  if (!document) {
    return (
      <section className="space-y-6">
        <Link
          to="/documents"
          className="text-sm font-semibold text-[#087f75] hover:text-[#075d57]"
        >
          Back to documents
        </Link>

        <div className="surface-panel border-l-4 border-l-[#c36d31] p-8 text-center">
          <p className="text-sm font-semibold text-[#253532]">
            Document not found
          </p>
          <p className="mt-1 text-sm text-[#74807c]">
            The selected document does not exist in local mock data.
          </p>
        </div>
      </section>
    );
  }

  const canProcess = document.status === "UPLOADED";
  const canRetry = document.status === "FAILED";

  return (
    <section className="space-y-7">
      <div>
        <Link
          to="/documents"
          className="text-sm font-semibold text-[#087f75] hover:text-[#075d57]"
        >
          Back to documents
        </Link>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="page-eyebrow">Document record</p>
            <h2 className="page-title break-all">
              {document.fileName}
            </h2>
            <p className="mt-2 text-sm text-[#74807c]">
              Document ID: {document.id}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <DocumentStatusBadge status={document.status} />

            {canProcess && (
              <button
                type="button"
                onClick={() => startProcessing(document.id)}
                className="primary-action"
              >
                Process
              </button>
            )}

            {canRetry && (
              <button
                type="button"
                onClick={() => startProcessing(document.id)}
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#b34c38] px-4 text-sm font-semibold text-white hover:bg-[#8e3728]"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid border border-[#ddd9cf] bg-[#fffefa] md:grid-cols-2 xl:grid-cols-4">
        <div className="border-b border-[#e5e1d8] p-4 md:border-r xl:border-b-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#74807c]">Type</p>
          <p className="mt-2 text-sm font-semibold text-[#253532]">
            {document.fileType}
          </p>
        </div>

        <div className="border-b border-[#e5e1d8] p-4 xl:border-b-0 xl:border-r">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#74807c]">Size</p>
          <p className="mt-2 text-sm font-semibold text-[#253532]">
            {formatFileSize(document.fileSize)}
          </p>
        </div>

        <div className="border-b border-[#e5e1d8] p-4 md:border-r md:border-b-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#74807c]">
            Uploaded At
          </p>
          <p className="mt-2 text-sm font-semibold text-[#253532]">
            {formatDate(document.uploadedAt)}
          </p>
        </div>

        <div className="p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#74807c]">Status</p>
          <div className="mt-2">
            <DocumentStatusBadge status={document.status} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <DocumentMetadata metadata={document.metadata} />
        <DocumentTimeline status={document.status} />
      </div>

      <ProcessingResult
        status={document.status}
        result={document.processingResult}
      />

      <ProcessingLogs logs={document.processingLogs} />
    </section>
  );
}
