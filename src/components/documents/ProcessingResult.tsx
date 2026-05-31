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
      <div className="border border-[#efc4b8] bg-[#fff0ec] p-4">
        <h3 className="surface-title text-[#a44735]">
          Processing Result
        </h3>
        <p className="mt-2 text-sm text-[#9b4938]">
          Document processing failed. Retry the workflow to generate a result.
        </p>
      </div>
    );
  }

  if (status !== "COMPLETED") {
    return (
      <div className="surface-panel p-4">
        <h3 className="surface-title">
          Processing Result
        </h3>
        <p className="mt-2 text-sm text-[#74807c]">
          The processing result will be available after the workflow is
          completed.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[#bfdbc4] bg-[#e8f4e9] p-4">
      <h3 className="surface-title text-[#387247]">
        Processing Result
      </h3>

      <p className="mt-2 text-sm text-[#416e49]">
        {result?.summary ?? "Document processing completed successfully."}
      </p>

      {result?.confidence !== undefined && (
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#387247]">
          Confidence: {Math.round(result.confidence * 100)}%
        </p>
      )}

      {result?.extractedText && (
        <div className="mt-4 border-t border-[#bfdbc4] pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#387247]">
            Extracted Text
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-[#416e49]">
            {result.extractedText}
          </p>
        </div>
      )}
    </div>
  );
}
