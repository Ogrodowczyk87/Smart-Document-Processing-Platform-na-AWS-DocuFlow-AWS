import type { DocumentStatus } from "../../types/document";

type DocumentTimelineProps = {
  status: DocumentStatus;
};

const completedFlow: DocumentStatus[] = [
  "UPLOADED",
  "VALIDATING",
  "EXTRACTING_METADATA",
  "PROCESSING",
  "COMPLETED",
];

const failedFlow: DocumentStatus[] = [
  "UPLOADED",
  "VALIDATING",
  "PROCESSING",
  "FAILED",
];

const statusLabels: Record<DocumentStatus, string> = {
  UPLOADED: "Uploaded",
  VALIDATING: "Validating",
  EXTRACTING_METADATA: "Extracting Metadata",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  FAILED: "Failed",
};

export function DocumentTimeline({ status }: DocumentTimelineProps) {
  const flow = status === "FAILED" ? failedFlow : completedFlow;
  const currentIndex = flow.indexOf(status);

  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-950">
          Processing Timeline
        </h3>
      </div>

      <ol className="space-y-4 p-4">
        {flow.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFailed = step === "FAILED";

          return (
            <li key={step} className="flex gap-3">
              <div
                className={[
                  "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ring-1",
                  isFailed && isCurrent
                    ? "bg-red-600 text-white ring-red-600"
                    : isCompleted || isCurrent
                      ? "bg-sky-600 text-white ring-sky-600"
                      : "bg-white text-slate-400 ring-slate-300",
                ].join(" ")}
              >
                {index + 1}
              </div>

              <div>
                <p
                  className={[
                    "text-sm font-medium",
                    isCurrent ? "text-slate-950" : "text-slate-600",
                  ].join(" ")}
                >
                  {statusLabels[step]}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {isCurrent
                    ? "Current status"
                    : isCompleted
                      ? "Completed"
                      : "Pending"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
