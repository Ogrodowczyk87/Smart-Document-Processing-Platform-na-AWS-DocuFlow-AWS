import type { Document } from "../../types/document";
import { formatDate } from "../../utils/formatDate";
import { getStatusLabel } from "../../utils/statusUtils";
import { DocumentStatusBadge } from "../documents/DocumentStatusBadge";

type ProcessingActivityProps = {
  documents: Document[];
};

export function ProcessingActivity({ documents }: ProcessingActivityProps) {
  const activityItems = documents
    .map((document) => ({
      id: document.id,
      fileName: document.fileName,
      status: document.status,
      uploadedAt: document.uploadedAt,
    }))
    .sort(
      (first, second) =>
        new Date(second.uploadedAt).getTime() -
        new Date(first.uploadedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-950">
          Processing Activity
        </h3>
      </div>

      <div className="divide-y divide-slate-100">
        {activityItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-950">
                {item.fileName}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {formatDate(item.uploadedAt)} - {getStatusLabel(item.status)}
              </p>
            </div>

            <DocumentStatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
