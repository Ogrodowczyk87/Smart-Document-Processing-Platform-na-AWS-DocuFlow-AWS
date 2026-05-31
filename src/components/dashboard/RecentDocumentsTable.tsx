import { Link } from "react-router-dom";
import type { Document } from "../../types/document";
import { formatDate } from "../../utils/formatDate";
import { formatFileSize } from "../../utils/formatFileSize";
import { DocumentStatusBadge } from "../documents/DocumentStatusBadge";

type RecentDocumentsTableProps = {
  documents: Document[];
};

export function RecentDocumentsTable({ documents }: RecentDocumentsTableProps) {
  return (
    <div className="surface-panel">
      <div className="surface-header flex items-center justify-between">
        <h3 className="surface-title">
          Recent Documents
        </h3>
        <span className="text-xs font-semibold text-[#087f75]">Latest 5</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
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
            {documents.map((document) => (
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
                  <Link
                    to={`/documents/${document.id}`}
                    className="text-sm font-semibold text-[#087f75] hover:text-[#075d57]"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
