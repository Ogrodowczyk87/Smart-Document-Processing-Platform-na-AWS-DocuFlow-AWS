import type { DocumentStatus } from "../../types/document";
import { getStatusColorClasses, getStatusLabel } from "../../utils/statusUtils";

type DocumentStatusBadgeProps = {
  status: DocumentStatus;
};

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${getStatusColorClasses(
        status,
      )}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
