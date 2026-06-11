const allowedFileTypes = ["application/pdf", "text/plain", "text/csv"];

export function isAllowedFileType(fileType: string): boolean {
  return allowedFileTypes.includes(fileType);
}