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
    <div className="surface-panel">
      <div className="surface-header">
        <h3 className="surface-title">
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
                    ? "bg-[#b34c38] text-white ring-[#b34c38]"
                    : isCompleted || isCurrent
                      ? "bg-[#0b756d] text-white ring-[#0b756d]"
                      : "bg-[#fffefa] text-[#9aa29e] ring-[#d4cec2]",
                ].join(" ")}
              >
                {index + 1}
              </div>

              <div>
                <p
                  className={[
                    "text-sm font-medium",
                    isCurrent ? "text-[#253532]" : "text-[#68746f]",
                  ].join(" ")}
                >
                  {statusLabels[step]}
                </p>

                <p className="mt-0.5 text-xs text-[#87908d]">
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
