import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DocumentTable } from "../components/documents/DocumentTable";
import { useDocuments } from "../hooks/useDocuments";
import type { DocumentStatus } from "../types/document";
import { getStatusLabel } from "../utils/statusUtils";

type StatusFilter = DocumentStatus | "ALL";
type SortDirection = "newest" | "oldest";

const statusFilters: StatusFilter[] = [
  "ALL",
  "UPLOADED",
  "VALIDATING",
  "EXTRACTING_METADATA",
  "PROCESSING",
  "COMPLETED",
  "FAILED",
];

export function Documents() {
  const { documents } = useDocuments();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("newest");

  const filteredDocuments = useMemo(() => {
    return documents
      .filter((document) => {
        const matchesSearch = document.fileName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === "ALL" || document.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((firstDocument, secondDocument) => {
        const firstDate = new Date(firstDocument.uploadedAt).getTime();
        const secondDate = new Date(secondDocument.uploadedAt).getTime();

        if (sortDirection === "newest") {
          return secondDate - firstDate;
        }

        return firstDate - secondDate;
      });
  }, [documents, searchQuery, statusFilter, sortDirection]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Documents</h2>
          <p className="mt-1 text-sm text-slate-600">
            Browse uploaded files and inspect processing status.
          </p>
        </div>

        <Link
          to="/upload"
          className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Upload document
        </Link>
      </div>

      <div className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_220px_180px]">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase text-slate-500">
            Search
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by file name"
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase text-slate-500">
            Status
          </span>
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>
                {status === "ALL" ? "All statuses" : getStatusLabel(status)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase text-slate-500">
            Sort
          </span>
          <select
            value={sortDirection}
            onChange={(event) =>
              setSortDirection(event.target.value as SortDirection)
            }
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>

      {filteredDocuments.length > 0 ? (
        <DocumentTable documents={filteredDocuments} />
      ) : (
        <div className="rounded-md border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-950">
            No documents found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try changing the search phrase or selected status.
          </p>
        </div>
      )}
    </section>
  );
}
