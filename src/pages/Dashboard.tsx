import { ProcessingActivity } from "../components/dashboard/ProcessingActivity";
import { RecentDocumentsTable } from "../components/dashboard/RecentDocumentsTable";
import { StatCard } from "../components/dashboard/StatCard";
import { useDocuments } from "../hooks/useDocuments";
import { formatFileSize } from "../utils/formatFileSize";

export function Dashboard() {
  const {
    documents,
    totalDocuments,
    processingDocuments,
    completedDocuments,
    failedDocuments,
    storageUsed,
  } = useDocuments();

  return (
    <section className="space-y-7">
      <div>
        <p className="page-eyebrow">Operations overview</p>
        <h2 className="page-title">Document control room</h2>
        <p className="page-description">
          Overview of document volume, processing status, and storage usage.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total documents" value={totalDocuments} tone="ink" />
        <StatCard label="In processing" value={processingDocuments} tone="amber" />
        <StatCard label="Completed" value={completedDocuments} tone="teal" />
        <StatCard label="Failed" value={failedDocuments} tone="coral" />
        <StatCard label="Storage used" value={formatFileSize(storageUsed)} />
      </div>

      <RecentDocumentsTable documents={documents.slice(0, 5)} />
      <ProcessingActivity documents={documents} />
    </section>
  );
}
