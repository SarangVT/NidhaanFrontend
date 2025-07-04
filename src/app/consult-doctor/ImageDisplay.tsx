"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHandshake, FaLock, FaUserMd } from 'react-icons/fa';

export default function ImageDisplay() {

  const router = useRouter();
  return (
    <section className="w-full bg-gradient-to-r from-[#d4f3f0] via-white to-[#fbfbfb] py-16 px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      {/* Left Content */}
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-4xl font-bold text-gray-900 mb-6">
          Online Consultations at Your Comfort
        </h1>
        <br/><br/>
        <div className="text-xl font-bold mb-8">
          <div className="space-y-3 text-sm md:text-base">
              <p className="flex items-center gap-2">
                <FaHandshake className="text-teal-600" />
                No-Cost Follow-Ups & Hassle-Free Cancellations
              </p>
              <p className="flex items-center gap-2">
                <FaLock className="text-teal-600" />
                Completely Private and Confidential Care
              </p>
              <p className="flex items-center gap-2">
                <FaUserMd className="text-teal-600" />
                Expert Support for Every Health Concern
              </p>
            </div>
        </div>
        <button onClick={() => router.push('/consult-doctor/book-appointment')} className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition-all">
          Consult Now
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
