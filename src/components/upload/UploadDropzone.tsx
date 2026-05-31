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
      className="flex min-h-72 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#b9b2a5] bg-[#fffefa] p-10 text-center hover:border-[#0b756d] hover:bg-[#eef7f4]"
    >
      <input
        type="file"
        accept=".pdf,.txt,.csv"
        onChange={handleInputChange}
        className="sr-only"
      />

      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#087f75]">
        Document intake
      </p>

      <p className="mt-3 text-lg font-semibold text-[#253532]">
        Drop a document here or click to upload
      </p>

      <p className="mt-2 text-sm text-[#74807c]">
        PDF, TXT, or CSV up to 5 MB
      </p>

      {error && <p className="mt-3 text-sm font-semibold text-[#b34c38]">{error}</p>}
    </label>
  );
}
