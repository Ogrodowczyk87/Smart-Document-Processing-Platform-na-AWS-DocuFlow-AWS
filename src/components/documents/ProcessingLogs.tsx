import type { ProcessingLog } from "../../types/document";
import { formatDate } from "../../utils/formatDate";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

type ProcessingLogsProps = {
  logs: ProcessingLog[];
};

export function ProcessingLogs({ logs }: ProcessingLogsProps) {
  return (
    <div className="surface-panel">
      <div className="surface-header">
        <h3 className="surface-title">
          Processing Logs
        </h3>
      </div>

      {logs.length > 0 ? (
        <ul className="divide-y divide-[#eeeae2]">
          {logs.map((log) => (
            <li
              key={log.id}
              className="flex flex-col gap-2 px-5 py-3 hover:bg-[#f9f6ef] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-[#253532]">
                  {log.message}
                </p>
                <p className="mt-1 text-xs text-[#74807c]">
                  {formatDate(log.timestamp)}
                </p>
              </div>

              <DocumentStatusBadge status={log.status} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-5 py-6 text-sm text-[#74807c]">
          No processing logs available.
        </p>
      )}
    </div>
  );
}
