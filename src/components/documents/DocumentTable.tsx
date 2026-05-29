import { Link } from "react-router-dom";
import type { Document } from "../../types/document";
import { formatDate } from "../../utils/formatDate";
import { formatFileSize } from "../../utils/formatFileSize";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

type DocumentTableProps = {
  documents: Document[];
};

export function DocumentTable({ documents }: DocumentTableProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">File Name</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Size</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Uploaded At</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {documents.map((document) => (
              <tr key={document.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-950">
                  {document.fileName}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {document.fileType}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {formatFileSize(document.fileSize)}
                </td>

                <td className="px-4 py-3">
                  <DocumentStatusBadge status={document.status} />
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {formatDate(document.uploadedAt)}
                </td>

                <td className="px-4 py-3">
                  <Link
                    to={`/documents/${document.id}`}
                    className="text-sm font-medium text-sky-700 hover:text-sky-900"
                  >
                    View Details
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
