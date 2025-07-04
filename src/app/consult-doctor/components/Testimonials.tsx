"use client"
import { useEffect, useState, useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Mehta",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    message: "Nidhaan has made managing my pharmacy so easy! Orders are seamless and payments come right on time.",
  },
  {
    name: "Sneha Kapoor",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    message: "With Nidhaan, I can focus more on serving patients and less on paperwork. It's a huge relief!",
  },
  {
    name: "Rahul Sharma",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    message: "The best platform for pharmacy owners! Great support, more sales, and happy customers every day.",
  },
  {
    name: "Neha Joshi",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
    message: "Nidhaan has been a game changer for my business. It's simple, trustworthy, and delivers results!",
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const swipeThreshold = 50;

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const handleTouchStart = (e: any) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: any) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goTo((current + 1) % testimonials.length); // Swipe left
      } else {
        goTo((current - 1 + testimonials.length) % testimonials.length); // Swipe right
      }
    }
  };

  const getPositionClass = (index: number) => {
    const len = testimonials.length;
    const left = (current - 1 + len) % len;
    const center = current;
    const right = (current + 1) % len;

    if (index === center)
      return "z-20 scale-100 opacity-100 translate-x-0";
    if (index === left)
      return "z-10 scale-95 opacity-50 -translate-x-80";
    if (index === right)
      return "z-10 scale-95 opacity-50 translate-x-80";

    return "opacity-0 scale-75 translate-x-0 pointer-events-none absolute";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 z-10">
      <h1 className="px-5 text-4xl text-left w-full leading-loose font-bold bg-gradient-to-r from-red-600 to-pink-400 bg-clip-text text-transparent">
        Why People Love Consulting with Nidhaan ❤️
      </h1>
      <div
        className="relative w-full max-w-6xl h-[28rem] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className={`absolute transition-all duration-700 ease-in-out transform bg-white border border-gray-300 rounded-3xl shadow-2xl px-10 py-10 text-center flex flex-col items-center w-[32rem] ${getPositionClass(idx)}`}
          >
            <FaQuoteLeft className="text-red-400 text-3xl mb-4 self-start" />
            <p className="text-gray-700 text-lg italic leading-relaxed">{t.message}</p>
            <div className="mt-8 flex flex-col items-center">
              <img
                src={t.photo}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-red-300 mb-2 transition-all duration-500"
              />
              <h2 className="text-xl font-semibold text-gray-800">{t.name}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex space-x-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              idx === current ? "bg-red-500" : "bg-red-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
