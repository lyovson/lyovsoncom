// useFileUpload.js
import { useState } from "react";

export default function useFileUpload() {
  const [blob, setBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    if (!file || file.type.indexOf("image/") !== 0) {
      setError("Please select a valid image file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/image/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const newBlob = await response.json();

      setBlob(newBlob);
      navigator.clipboard.writeText(newBlob.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { blob, loading, error, setBlob, uploadFile };
}