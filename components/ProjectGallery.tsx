"use client";

import { useState } from "react";
import Image from "next/image";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

type Props = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const THUMB_SIZE = 100;
  const THUMB_GAP = 8;
  const THUMB_COUNT = 5;
  const galleryHeight = THUMB_COUNT * THUMB_SIZE + (THUMB_COUNT - 1) * THUMB_GAP;

  return (
    <>
      {/* DESKTOP */}
      <div
        className="hidden md:flex gap-2"
        style={{ height: galleryHeight }}
      >
        {/* THUMBNAILS */}
        <div className="flex flex-col shrink-0" style={{ gap: THUMB_GAP, width: THUMB_SIZE }}>
          {images.slice(0, THUMB_COUNT).map((img, i) => (
            <div
              key={i}
              onClick={() => { setIndex(i); setOpen(true); }}
              className="relative shrink-0 overflow-hidden rounded-xl cursor-pointer border border-white/10 group transition-all duration-200"
              style={{
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                boxShadow: index === i ? "0 0 0 2px var(--qc-gold)" : "none",
              }}
            >
              <Image
                src={img}
                alt={`${title}-${i}`}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              {i === THUMB_COUNT - 1 && images.length > THUMB_COUNT && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-lg font-bold text-white">
                  +{images.length - THUMB_COUNT}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ẢNH LỚN — desktop với blur */}
        <div
          className="relative flex-1 overflow-hidden rounded-2xl cursor-pointer"
          onClick={() => { setIndex(index); setOpen(true); }}
        >
          <Image
            src={images[index] || images[0]}
            alt=""
            fill
            className="object-cover scale-110 blur-xl opacity-50"
            aria-hidden
          />
          <Image
            src={images[index] || images[0]}
            alt={title}
            fill
            priority
            className="object-contain relative z-10"
          />
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden gap-2">
        {/* THUMBNAILS */}
        <div className="flex flex-col shrink-0" style={{ gap: THUMB_GAP, width: 72 }}>
          {images.slice(0, THUMB_COUNT).map((img, i) => (
            <div
              key={i}
              onClick={() => { setIndex(i); setOpen(true); }}
              className="relative shrink-0 overflow-hidden rounded-xl cursor-pointer border border-white/10 group transition-all duration-200"
              style={{
                width: 72,
                height: 72,
                boxShadow: index === i ? "0 0 0 2px var(--qc-gold)" : "none",
              }}
            >
              <Image
                src={img}
                alt={`${title}-${i}`}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              {i === THUMB_COUNT - 1 && images.length > THUMB_COUNT && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-lg font-bold text-white">
                  +{images.length - THUMB_COUNT}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ẢNH LỚN — mobile, cover bình thường */}
        <div
          className="relative flex-1 overflow-hidden rounded-2xl cursor-pointer"
          style={{ height: THUMB_COUNT * 72 + (THUMB_COUNT - 1) * THUMB_GAP }}
          onClick={() => { setIndex(index); setOpen(true); }}
        >
          <Image
            src={images[index] || images[0]}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        plugins={[Zoom]}
        slides={images.map((img) => ({ src: img }))}
      />
    </>
  );
}