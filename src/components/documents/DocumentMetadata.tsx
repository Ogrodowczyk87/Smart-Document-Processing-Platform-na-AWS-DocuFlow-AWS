import type { DocumentMetadata as DocumentMetadataType } from "../../types/document";

type DocumentMetadataProps = {
  metadata: DocumentMetadataType;
};

export function DocumentMetadata({ metadata }: DocumentMetadataProps) {
  const extractedFields = Object.entries(metadata.extractedFields ?? {});

  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-950">Metadata</h3>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetadataItem label="Pages" value={metadata.pageCount} />
        <MetadataItem label="Rows" value={metadata.rowCount} />
        <MetadataItem label="Words" value={metadata.wordCount} />
        <MetadataItem label="Language" value={metadata.language} />
      </div>

      {extractedFields.length > 0 && (
        <div className="border-t border-slate-100 px-4 py-4">
          <h4 className="text-xs font-semibold uppercase text-slate-500">
            Extracted Fields
          </h4>

          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {extractedFields.map(([key, value]) => (
              <div key={key} className="rounded-md bg-slate-50 p-3">
                <dt className="text-xs font-medium uppercase text-slate-500">
                  {key}
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-950">
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
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">
        {value ?? "Not available"}
      </p>
    </div>
  );
}
