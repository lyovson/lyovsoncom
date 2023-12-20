"use client";
// ImageDisplay.js

import Image from "next/image";
import { deleteImage } from "../../lib/actions";
import Button from "../../ui/Button";

export default function ImageDisplay({ src, onDelete }) {
  return (
    <div className="relative cursor-pointer">
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 bg-black bg-opacity-50 opacity-0 hover:opacity-100"
        onClick={onDelete}
      >
        <Button onClick={() => deleteImage(src)}>X</Button>
      </div>
      <Image src={src} alt={src} width="400" height="300" />
    </div>
  );
}
