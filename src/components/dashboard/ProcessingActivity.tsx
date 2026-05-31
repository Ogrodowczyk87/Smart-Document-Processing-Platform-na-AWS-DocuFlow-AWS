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
    <div className="surface-panel">
      <div className="surface-header">
        <h3 className="surface-title">
          Processing Activity
        </h3>
      </div>

      <div className="divide-y divide-[#eeeae2]">
        {activityItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 border-l-2 border-transparent px-5 py-3 hover:border-[#e1a33e] hover:bg-[#f9f6ef] sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-[#253532]">
                {item.fileName}
              </p>
              <p className="mt-1 text-xs text-[#74807c]">
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
