"use client";

import { useCallback, useState } from "react";

interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const ALLOWED_EXTENSIONS = ".jpg, .jpeg, .png, .webp, .heic";

export function ImageUploader({
  onFilesChange,
  maxFiles = 6,
  maxSizeMB = 10,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      setError(null);
      const arr = Array.from(incoming);

      // Validate types
      const invalid = arr.filter((f) => !ALLOWED_TYPES.includes(f.type));
      if (invalid.length > 0) {
        setError(
          `Unsupported file type. Please upload ${ALLOWED_EXTENSIONS} images only.`
        );
        return;
      }

      // Validate sizes
      const oversized = arr.filter((f) => f.size > maxSizeMB * 1024 * 1024);
      if (oversized.length > 0) {
        setError(`Files must be under ${maxSizeMB}MB each.`);
        return;
      }

      // Check total count
      const combined = [...files, ...arr];
      if (combined.length > maxFiles) {
        setError(`You can upload a maximum of ${maxFiles} images.`);
        return;
      }

      // Generate previews
      const newPreviews = arr.map((f) => URL.createObjectURL(f));

      const nextFiles = [...files, ...arr];
      const nextPreviews = [...previews, ...newPreviews];

      setFiles(nextFiles);
      setPreviews(nextPreviews);
      onFilesChange(nextFiles);
    },
    [files, previews, maxFiles, maxSizeMB, onFilesChange]
  );

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    const nextFiles = files.filter((_, i) => i !== index);
    const nextPreviews = previews.filter((_, i) => i !== index);
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    onFilesChange(nextFiles);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        className={`border-2 border-dashed transition-colors p-8 text-center cursor-pointer ${
          dragging
            ? "border-[var(--charcoal)] bg-[var(--beige)]"
            : "border-[var(--border)] hover:border-[var(--charcoal)]"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-upload-input")?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload images by clicking or dragging"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ")
            document.getElementById("file-upload-input")?.click();
        }}
      >
        <svg
          className="mx-auto mb-3 text-[var(--text-muted)]"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p className="text-sm text-[var(--charcoal)] font-medium">
          Drag photos here or{" "}
          <span className="underline underline-offset-2">click to browse</span>
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1.5">
          {ALLOWED_EXTENSIONS.toUpperCase()} · Max {maxSizeMB}MB per image · Up
          to {maxFiles} images
        </p>
        <input
          id="file-upload-input"
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          multiple
          className="sr-only"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div
          className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3"
          aria-label="Uploaded images"
        >
          {previews.map((src, i) => (
            <div key={i} className="relative aspect-square group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Uploaded image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove image ${i + 1}`}
                className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
