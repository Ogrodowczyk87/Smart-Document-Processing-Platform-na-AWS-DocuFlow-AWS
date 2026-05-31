import { Link } from "react-router-dom";
import { useDocumentContext } from "../../context/DocumentContext";
import type { Document } from "../../types/document";
import { formatDate } from "../../utils/formatDate";
import { formatFileSize } from "../../utils/formatFileSize";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

type DocumentTableProps = {
  documents: Document[];
};

export function DocumentTable({ documents }: DocumentTableProps) {
  const { startProcessing } = useDocumentContext();

  return (
    <div className="surface-panel">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="data-table-head">
            <tr>
              <th className="px-4 py-3 font-semibold">File Name</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Size</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Uploaded At</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eeeae2]">
            {documents.map((document) => {
              const canProcess = document.status === "UPLOADED";
              const canRetry = document.status === "FAILED";

              return (
                <tr key={document.id} className="hover:bg-[#f9f6ef]">
                  <td className="px-4 py-3 font-semibold text-[#253532]">
                    {document.fileName}
                  </td>

                  <td className="px-4 py-3 text-[#68746f]">
                    {document.fileType}
                  </td>

                  <td className="px-4 py-3 text-[#68746f]">
                    {formatFileSize(document.fileSize)}
                  </td>

                  <td className="px-4 py-3">
                    <DocumentStatusBadge status={document.status} />
                  </td>

                  <td className="px-4 py-3 text-[#68746f]">
                    {formatDate(document.uploadedAt)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/documents/${document.id}`}
                        className="text-sm font-semibold text-[#087f75] hover:text-[#075d57]"
                      >
                        View Details
                      </Link>

                      {canProcess && (
                        <button
                          type="button"
                          onClick={() => startProcessing(document.id)}
                          className="text-sm font-semibold text-[#387247] hover:text-[#255c33]"
                        >
                          Process
                        </button>
                      )}

                      {canRetry && (
                        <button
                          type="button"
                          onClick={() => startProcessing(document.id)}
                          className="text-sm font-semibold text-[#b34c38] hover:text-[#8e3728]"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
