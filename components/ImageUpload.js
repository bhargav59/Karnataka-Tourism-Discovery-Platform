import { useState, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function ImageUpload({
  onUploadComplete,
  multiple = false,
  existingImages = [],
}) {
  const { language } = useLanguage();
  const t = translations[language];
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState(existingImages);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // Validate file types
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಚಿತ್ರ ಫೈಲ್‌ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ (JPG, PNG, WEBP)"
          : "Please select valid image files (JPG, PNG, WEBP)"
      );
      return;
    }

    // Validate file sizes (10MB max per file)
    const maxSize = 10 * 1024 * 1024;
    const oversizedFiles = files.filter((file) => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      setError(
        language === "kn"
          ? "ಫೈಲ್ ಗಾತ್ರ 10MB ಗಿಂತ ಹೆಚ್ಚಿರಬಾರದು"
          : "File size must be less than 10MB"
      );
      return;
    }

    setError("");
    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        return {
          url: data.url,
          publicId: data.publicId,
          width: data.width,
          height: data.height,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      const newImages = multiple
        ? [...images, ...uploadedImages]
        : uploadedImages;

      setImages(newImages);

      if (onUploadComplete) {
        onUploadComplete(newImages);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        language === "kn"
          ? "ಅಪ್‌ಲೋಡ್ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
          : "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    if (onUploadComplete) {
      onUploadComplete(newImages);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const fakeEvent = {
        target: {
          files: files,
        },
      };
      handleFileSelect(fakeEvent);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600">
              {language === "kn" ? "ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ..." : "Uploading..."}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600">
              {language === "kn"
                ? "ಚಿತ್ರಗಳನ್ನು ಇಲ್ಲಿ ಡ್ರ್ಯಾಗ್ ಮಾಡಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ ಆಯ್ಕೆಮಾಡಿ"
                : "Drag images here or click to select"}
            </p>
            <p className="text-sm text-gray-500">
              {language === "kn"
                ? "JPG, PNG, WEBP (ಗರಿಷ್ಠ 10MB)"
                : "JPG, PNG, WEBP (Max 10MB)"}
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700">
          {error}
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={`Upload ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(index);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title={language === "kn" ? "ತೆಗೆದುಹಾಕಿ" : "Remove"}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
