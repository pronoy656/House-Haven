"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, UploadCloud } from "lucide-react";

interface Step5PhotosProps {
  allPhotos: string[];
  setAllPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  activePhotoIndex: number;
  setActivePhotoIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function Step5Photos({
  allPhotos,
  setAllPhotos,
  activePhotoIndex,
  setActivePhotoIndex,
}: Step5PhotosProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setAllPhotos((prev) => [...prev, ...newUrls]);
      setActivePhotoIndex(allPhotos.length);
    }
  };

  const removePhoto = (indexToRemove: number) => {
    if (allPhotos.length <= 1) return;
    setAllPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (activePhotoIndex >= allPhotos.length - 1) {
      setActivePhotoIndex(Math.max(0, allPhotos.length - 2));
    }
  };

  const nextActivePhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevActivePhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  return (
    <div className="space-y-4">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        onChange={handleFilesUpload}
        className="hidden"
      />

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-tight">
          Add Photos
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-500 font-normal">
          Upload photos from your gallery or choose from the album.
        </p>
      </div>

      {/* Interactive Primary Photo Carousel */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-[13px] font-bold text-slate-800">
            Photo Preview
          </label>
          <span className="text-[11px] font-semibold text-slate-400">
            {activePhotoIndex + 1} of {allPhotos.length}
          </span>
        </div>

        <div className="relative w-full h-[200px] rounded-3xl overflow-hidden shadow-xs border border-slate-200 bg-slate-900">
          <Image
            src={allPhotos[activePhotoIndex]}
            alt={`Property Photo ${activePhotoIndex + 1}`}
            fill
            sizes="(max-width: 480px) 100vw, 440px"
            className="object-cover"
            priority
          />

          <button
            type="button"
            onClick={prevActivePhoto}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={nextActivePhoto}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-90"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {allPhotos.length > 1 && (
            <button
              type="button"
              onClick={() => removePhoto(activePhotoIndex)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              aria-label="Delete this photo"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5">
            {allPhotos.map((_, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => setActivePhotoIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActivePhotoIndex(idx);
                  }
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === activePhotoIndex
                    ? "w-5 bg-white shadow-xs"
                    : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Upload Action Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-24 rounded-2xl border-2 border-dashed border-[#0891A2]/40 bg-[#F0FDFA] flex flex-col items-center justify-center gap-1.5 text-slate-500 hover:text-[#0891A2] hover:border-[#0891A2] hover:bg-cyan-50/70 transition-all cursor-pointer group shadow-xs"
        >
          <div className="w-9 h-9 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover:scale-105 transition-transform">
            <UploadCloud className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-slate-800">
            Click to open gallery &amp; upload photos
          </span>
          <span className="text-[10px] text-slate-400">
            Select multiple photos • JPG, PNG (Max 10 MB)
          </span>
        </button>
      </div>

      {/* Album Thumbnails Grid */}
      <div className="space-y-2 pt-1">
        <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
          Album Photos ({allPhotos.length})
        </label>

        <div className="grid grid-cols-4 gap-2">
          {allPhotos.map((photo, idx) => {
            const isActive = idx === activePhotoIndex;
            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => setActivePhotoIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActivePhotoIndex(idx);
                  }
                }}
                className={`relative w-full h-18 rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${
                  isActive
                    ? "border-[#0891A2] ring-2 ring-[#0891A2]/30 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={photo}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="90px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
