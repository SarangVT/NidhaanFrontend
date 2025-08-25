"use client";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BookingCard from "./components/BookingCard";
type Test = {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  reportDelivery: string;
  homeCollection: boolean;
};

const tests: Test[] = [
  {
    id: 1,
    title: "Xpert Health Comprehensive",
    price: 4299,
    originalPrice: 5732,
    discount: "25% off",
    reportDelivery: "Speak to our customer care",
    homeCollection: true,
  },
  {
    id: 2,
    title: "Xpert Health Master check",
    price: 2999,
    originalPrice: 3999,
    discount: "25% off",
    reportDelivery: "Speak to our customer care",
    homeCollection: true,
  },
  {
    id: 3,
    title: "Xpert Health Senior Citizen-Female",
    price: 4399,
    originalPrice: 5865,
    discount: "25% off",
    reportDelivery: "Speak to our customer care",
    homeCollection: true,
  },
  {
    id: 4,
    title: "Xpert Health Senior Citizen-Male",
    price: 4399,
    originalPrice: 5865,
    discount: "25% off",
    reportDelivery: "Speak to our customer care",
    homeCollection: true,
  },
];

export default function MostRecomendedTests() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Most Recommended Tests</h2>
        <button className="text-teal-600 font-medium hover:underline">View All</button>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {tests.map((test) => (
            <BookingCard key={test.id} test={test} />
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-teal-500 text-white p-2 rounded-full shadow-lg hover:bg-teal-600"
        >
          <FiChevronLeft size={20} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-teal-500 text-white p-2 rounded-full shadow-lg hover:bg-teal-600"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

