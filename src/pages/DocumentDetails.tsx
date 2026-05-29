import { Link, useParams } from "react-router-dom";
import { DocumentMetadata } from "../components/documents/DocumentMetadata";
import { DocumentStatusBadge } from "../components/documents/DocumentStatusBadge";
import { DocumentTimeline } from "../components/documents/DocumentTimeline";
import { useDocuments } from "../hooks/useDocuments";
import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";

export function DocumentDetails() {
  const { id } = useParams();
  const { documents } = useDocuments();

  const document = documents.find((document) => document.id === id);

  if (!document) {
    return (
      <section className="space-y-6">
        <Link to="/documents" className="text-sm font-medium text-sky-700">
          Back to documents
        </Link>

        <div className="rounded-md border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-950">
            Document not found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            The selected document does not exist in local mock data.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <Link to="/documents" className="text-sm font-medium text-sky-700">
          Back to documents
        </Link>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              {document.fileName}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Document ID: {document.id}
            </p>
          </div>

          <DocumentStatusBadge status={document.status} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase text-slate-500">Type</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {document.fileType}
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase text-slate-500">Size</p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {formatFileSize(document.fileSize)}
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase text-slate-500">
            Uploaded At
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-950">
            {formatDate(document.uploadedAt)}
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase text-slate-500">Status</p>
          <div className="mt-2">
            <DocumentStatusBadge status={document.status} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <DocumentMetadata metadata={document.metadata} />
        <DocumentTimeline status={document.status} />
      </div>
    </section>
  );
}
