import type { ProcessingLog } from "../../types/document";
import { formatDate } from "../../utils/formatDate";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

type ProcessingLogsProps = {
  logs: ProcessingLog[];
};

export function ProcessingLogs({ logs }: ProcessingLogsProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-950">
          Processing Logs
        </h3>
      </div>

      {logs.length > 0 ? (
        <ul className="divide-y divide-slate-100">
          {logs.map((log) => (
            <li
              key={log.id}
              className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium text-slate-950">
                  {log.message}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatDate(log.timestamp)}
                </p>
              </div>

              <DocumentStatusBadge status={log.status} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-6 text-sm text-slate-500">
          No processing logs available.
        </p>
      )}
    </div>
  );
}
