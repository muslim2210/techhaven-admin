import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Upload Foto
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="flex flex-col justify-center">
          <div className="mb-4 flex flex-wrap items-center gap-4">
            {value.map((url) => (
              <div key={url} className="relative w-[220px] h-[130px]">
                <div className="absolute right-0 top-0 z-10">
                  <Button
                    onClick={() => onRemove(url)}
                    className="bg-red-500 text-white"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Image
                  key={url}
                  src={url}
                  alt="preview"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
          <CldUploadWidget uploadPreset="jzw0lw28" onUpload={onUpload}>
            {({ open }) => {
              return (
                <Button
                  type="button"
                  onClick={() => open()}
                  className="text-white py-2 px-4 rounded-full flex items-center max-w-[200px] mx-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              );
            }}
          </CldUploadWidget>

          <p className="text-xs leading-5 mt-4 text-gray-600">
            PNG, JPG, JPEG up to 2MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
