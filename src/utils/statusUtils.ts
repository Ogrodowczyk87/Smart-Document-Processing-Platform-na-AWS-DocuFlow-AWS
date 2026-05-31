import type { DocumentStatus } from "../types/document";

export function getStatusLabel(status: DocumentStatus) {
  const labels: Record<DocumentStatus, string> = {
    UPLOADED: "Uploaded",
    VALIDATING: "Validating",
    EXTRACTING_METADATA: "Extracting metadata",
    PROCESSING: "Processing",
    COMPLETED: "Completed",
    FAILED: "Failed",
  };

  return labels[status];
}

export function getStatusColorClasses(status: DocumentStatus) {
  const colors: Record<DocumentStatus, string> = {
    UPLOADED: "bg-[#fff3d8] text-[#8a5a13] ring-[#efd7a8]",
    VALIDATING: "bg-[#e8f5f2] text-[#12635c] ring-[#b6ddd7]",
    EXTRACTING_METADATA: "bg-[#eee9f8] text-[#67538f] ring-[#d4c8eb]",
    PROCESSING: "bg-[#e5eef5] text-[#315f7a] ring-[#bfd2df]",
    COMPLETED: "bg-[#e8f4e9] text-[#387247] ring-[#bfdbc4]",
    FAILED: "bg-[#fff0ec] text-[#a44735] ring-[#efc4b8]",
  };

  return colors[status];
}
