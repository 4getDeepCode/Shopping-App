import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import axios from "axios";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-base font-semibold text-gray-300 mb-2 block">
        Upload Image
      </Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative
          rounded-xl
          border-2 border-dashed border-gray-700
          bg-gray-900
          p-4
          transition
          ${isEditMode ? "opacity-60 cursor-not-allowed" : "hover:border-yellow-400/60"}
        `}
      >
        {/* Yellow glow */}
        <div className="absolute inset-0 bg-yellow-500/5 blur-2xl rounded-xl pointer-events-none" />

        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`
              relative
              flex flex-col items-center justify-center h-32
              text-gray-400 text-sm
              ${isEditMode ? "cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <UploadCloudIcon className="w-10 h-10 mb-2 text-yellow-400" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-800 rounded-md" />
        ) : (
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileIcon className="w-8 h-8 text-yellow-400" />
              <p className="text-sm font-medium text-gray-200 truncate max-w-[200px]">
                {imageFile.name}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="
                text-gray-400
                hover:text-red-400
                hover:bg-gray-800
              "
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
