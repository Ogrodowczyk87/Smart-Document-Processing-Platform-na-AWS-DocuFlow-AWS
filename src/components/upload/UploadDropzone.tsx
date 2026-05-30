type UploadDropzoneProps = {
  onFileSelect: (file: File) => void;
  error?: string;
};

const allowedFileExtensions = [".pdf", ".txt", ".csv"];
const maxFileSize = 5 * 1024 * 1024;

export function UploadDropzone({ onFileSelect, error }: UploadDropzoneProps) {
  function validateFile(file: File) {
    const fileName = file.name.toLowerCase();
    const hasAllowedExtension = allowedFileExtensions.some((extension) =>
      fileName.endsWith(extension),
    );

    if (!hasAllowedExtension) {
      return "Only PDF, TXT, and CSV files are allowed.";
    }

    if (file.size > maxFileSize) {
      return "File size must be 5 MB or less.";
    }

    return null;
  }

  function handleFile(file: File) {
    const validationError = validateFile(file);

    if (validationError) {
      alert(validationError);
      return;
    }

    onFileSelect(file);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    handleFile(file);
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (!file) {
      return;
    }

    handleFile(file);
  }

  function handleDragOver(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
  }

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm hover:border-sky-400 hover:bg-sky-50"
    >
      <input
        type="file"
        accept=".pdf,.txt,.csv"
        onChange={handleInputChange}
        className="sr-only"
      />

      <p className="text-sm font-semibold text-slate-950">
        Drop a document here or click to upload
      </p>

      <p className="mt-2 text-sm text-slate-500">
        PDF, TXT, or CSV up to 5 MB
      </p>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
    </label>
  );
}
