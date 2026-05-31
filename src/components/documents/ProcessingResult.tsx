import type {
  DocumentStatus,
  ProcessingResult as ProcessingResultType,
} from "../../types/document";

type ProcessingResultProps = {
  status: DocumentStatus;
  result?: ProcessingResultType;
};

export function ProcessingResult({ status, result }: ProcessingResultProps) {
  if (status === "FAILED") {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-red-900">
          Processing Result
        </h3>
        <p className="mt-2 text-sm text-red-700">
          Document processing failed. Retry the workflow to generate a result.
        </p>
      </div>
    );
  }

  if (status !== "COMPLETED") {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-950">
          Processing Result
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          The processing result will be available after the workflow is
          completed.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-green-200 bg-green-50 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-green-900">
        Processing Result
      </h3>

      <p className="mt-2 text-sm text-green-800">
        {result?.summary ?? "Document processing completed successfully."}
      </p>

      {result?.confidence !== undefined && (
        <p className="mt-3 text-xs font-medium uppercase text-green-700">
          Confidence: {Math.round(result.confidence * 100)}%
        </p>
      )}

      {result?.extractedText && (
        <div className="mt-4 border-t border-green-200 pt-4">
          <p className="text-xs font-semibold uppercase text-green-700">
            Extracted Text
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-green-900">
            {result.extractedText}
          </p>
        </div>
      )}
    </div>
  );
}