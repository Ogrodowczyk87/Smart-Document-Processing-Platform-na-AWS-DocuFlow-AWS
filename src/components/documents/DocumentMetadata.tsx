import type { DocumentMetadata as DocumentMetadataType } from "../../types/document";

type DocumentMetadataProps = {
  metadata: DocumentMetadataType;
};

export function DocumentMetadata({ metadata }: DocumentMetadataProps) {
  const extractedFields = Object.entries(metadata.extractedFields ?? {});

  return (
    <div className="surface-panel">
      <div className="surface-header">
        <h3 className="surface-title">Extracted metadata</h3>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetadataItem label="Pages" value={metadata.pageCount} />
        <MetadataItem label="Rows" value={metadata.rowCount} />
        <MetadataItem label="Words" value={metadata.wordCount} />
        <MetadataItem label="Language" value={metadata.language} />
      </div>

      {extractedFields.length > 0 && (
        <div className="border-t border-[#eeeae2] px-4 py-4">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#66746f]">
            Extracted Fields
          </h4>

          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {extractedFields.map(([key, value]) => (
              <div key={key} className="border-l-2 border-[#e1a33e] bg-[#f8f5ee] p-3">
                <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#74807c]">
                  {key}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#253532]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

type MetadataItemProps = {
  label: string;
  value?: string | number;
};

function MetadataItem({ label, value }: MetadataItemProps) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#74807c]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#253532]">
        {value ?? "Not available"}
      </p>
    </div>
  );
}
