"use client"
import React, { useEffect, useState } from "react";
import { i1, i2, i3 } from "../../../assets/HomePage/HomepageSlider/HomePageSlider";
import Image from "next/image";

const images = [i1, i2, i3];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goToIndex = (index: number) => setCurrent(index);

  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-8 py-6 items-center">
      <div className="relative z-0 w-full mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <Image
                src={src}
                width={800}
                height={400}
                alt={`Slide ${index}`}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white text-lg font-bold rounded-full px-4 py-2 sm:px-6 sm:py-3 z-10"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white text-lg font-bold rounded-full px-4 py-2 sm:px-6 sm:py-3 z-10"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`h-2 w-2 rounded-full ${
                current === index ? "bg-green-500 px-2" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
