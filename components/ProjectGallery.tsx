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

  return (
    <>
      <div className="grid grid-cols-[100px_1fr] gap-1">

        {/* THUMBNAILS */}
        <div className="flex flex-col gap-3">
          {images.slice(0, 5).map((img, i) => (
            <div
              key={i}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer border border-white/10 group"
            >
              <Image
                src={img}
                alt={`${title}-${i}`}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Overlay +x */}
              {i === 4 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-2xl font-bold text-white">
                  +{images.length - 5}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ẢNH LỚN */}
        <div
          className="relative w-full max-w-[620px] h-[320px] sm:h-[480px] lg:h-[720px] overflow-hidden rounded-[2rem] cursor-pointer bg-black"
          onClick={() => {
            setIndex(index);
            setOpen(true);
          }}
        >
          <Image
            src={images[index] || images[0]}
            alt={title}
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        plugins={[Zoom]}
        slides={images.map((img) => ({
          src: img,
        }))}
      />
    </>
  );
}