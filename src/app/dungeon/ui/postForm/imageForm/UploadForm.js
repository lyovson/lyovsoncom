"use client";
// UploadForm.js
import { deleteImage } from "@/app/dungeon/lib/postActions";
import useFileUpload from "@/app/dungeon/lib/useFileUpload";
import ImageDisplay from "@/app/dungeon/ui/postForm/imageForm/ImageDisplay";
import ImageUploadForm from "@/app/dungeon/ui/postForm/imageForm/ImageUploadForm";
import { Suspense, useState } from "react";

export default function UploadForm({ value }) {
  const { blob, loading, error, setBlob, uploadFile } = useFileUpload();
  const [newImage, setNewImage] = useState(value || null);

  if (newImage) {
    return (
      <>
        <input
          name="imageUrl"
          type="url"
          required
          className="p-2 border border-dark dark:border-light bg-light dark:bg-dark focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={value}
        />
        <ImageDisplay
          src={newImage}
          onDelete={() => {
            deleteImage(newImage);
            setNewImage(null);
            setBlob(null);
          }}
        />
      </>
    );
  }

  return (
    <>
      {error && <div>Error: {error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!blob && <ImageUploadForm onFileSelected={uploadFile} />}
          {blob && (
            <Suspense fallback={<div>Loading...</div>}>
              <input
                name="imageUrl"
                type="url"
                required
                className="p-2 border border-dark dark:border-light bg-light dark:bg-dark focus:outline-none focus:ring-2 focus:ring-beige"
                value={blob.url}
              />
              <ImageDisplay
                src={blob.url}
                onDelete={() => {
                  deleteImage(blob.url);
                  setBlob(null);
                  setNewImage(null);
                }}
              />
            </Suspense>
          )}
        </>
      )}
    </>
  );
}