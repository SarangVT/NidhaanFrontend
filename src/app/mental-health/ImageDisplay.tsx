"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ImageDisplay() {

  const router = useRouter();
  return (
    <section className="w-full bg-gradient-to-r from-[#d4f3f0] via-white to-[#fbfbfb] py-16 px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      {/* Left Content */}
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-loose">
          Let's Find the Right <span className="text-teal-500">Therapist</span> for You Together
        </h1>
        <p className="text-xl font-bold mb-8">
            # Choose Help, Not Suffering
        </p>
        <button onClick={() => router.push('/mental-health/questions')} className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition-all">
          Get Started
        </button>
      </div>

      <div className="w-full md:w-[50%] flex justify-center">
        <img
          src={'MentalHealth/MentalhealthGIF.gif'}
          alt="Mental health consultation"
          className="max-w-full h-auto"
        />
      </div>
    </section>
  );
}
