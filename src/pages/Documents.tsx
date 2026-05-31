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
    <section className="space-y-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="page-eyebrow">Document registry</p>
          <h2 className="page-title">All documents</h2>
          <p className="page-description">
            Browse uploaded files and inspect processing status.
          </p>
        </div>

        <Link
          to="/upload"
          className="primary-action"
        >
          Upload document
        </Link>
      </div>

      <div className="surface-panel grid gap-4 border-l-4 border-l-[#e1a33e] p-5 lg:grid-cols-[1fr_220px_180px]">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#66746f]">
            Search
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by file name"
            className="form-control"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#66746f]">
            Status
          </span>
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            className="form-control"
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>
                {status === "ALL" ? "All statuses" : getStatusLabel(status)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#66746f]">
            Sort
          </span>
          <select
            value={sortDirection}
            onChange={(event) =>
              setSortDirection(event.target.value as SortDirection)
            }
            className="form-control"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>

      {filteredDocuments.length > 0 ? (
        <DocumentTable documents={filteredDocuments} />
      ) : (
        <div className="surface-panel p-10 text-center">
          <p className="text-sm font-semibold text-[#253532]">
            No documents found
          </p>
          <p className="mt-1 text-sm text-[#74807c]">
            Try changing the search phrase or selected status.
          </p>
        </div>
      )}
    </section>
  );
}
