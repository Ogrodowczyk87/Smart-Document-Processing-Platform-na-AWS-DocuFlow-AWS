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
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-600">
          Overview of document volume, processing status, and storage usage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Documents" value={totalDocuments} />
        <StatCard label="Processing" value={processingDocuments} />
        <StatCard label="Completed" value={completedDocuments} />
        <StatCard label="Failed" value={failedDocuments} />
        <StatCard
          label="Storage Used"
          value={formatFileSize(storageUsed)}
        />
      </div>

      <RecentDocumentsTable documents={documents.slice(0, 5)} />
      <ProcessingActivity documents={documents} />
    </section>
  );
}
