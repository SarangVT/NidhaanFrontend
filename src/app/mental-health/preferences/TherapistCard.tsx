"use client"
import { FiVideo, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { Key } from 'react';

type Therapist = {
    name: String
    degrees: String
    specialty: String
    image: String
    tags: String[]
    languages: String[]
    counselling: String[]
    nextSlot: String
}

export default function TherapistCard({ therapist }: {therapist: any}) {
  const {
    name,
    degrees,
    specialty,
    image,
    tags,
    languages,
    counselling,
    nextSlot,
  } = therapist;
  const router = useRouter()
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
      <div className="bg-teal-700 p-4 rounded-t-2xl relative">
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div className="text-white">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-sm">{degrees}</p>
            <p className="text-sm">{specialty}</p>
          </div>
        </div>
        <span className="absolute top-4 right-4 text-sm font-semibold px-2 py-1 text-white rounded">
          Therapist
        </span>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex justify-center space-x-4 text-teal-700">
          <FiVideo className="w-6 h-6 cursor-pointer" />
          <FiPhone className="w-6 h-6 cursor-pointer" />
          <FiMessageCircle className="w-6 h-6 cursor-pointer" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {tags.slice(0, 8).map((tag: String, idx: Key) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags.length > 8 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              +{tags.length - 8} More
            </span>
          )}
        </div>

        {/* Languages */}
        <div>
          <h3 className="font-bold text-center">Languages</h3>
          <div className="flex justify-center flex-wrap gap-2 text-sm text-gray-700">
            {languages.map((lang: String, idx: Key) => (
              <span key={idx} className="flex items-center gap-1">
                ✅ {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Counselling */}
        <div>
          <h3 className="font-bold text-center">Counselling</h3>
          <div className="flex justify-center flex-wrap gap-2 text-sm text-gray-700">
            {counselling.map((type: String, idx: Key) => (
              <span key={idx} className="flex items-center gap-1">
                ✅ {type}
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="bg-teal-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-teal-600 transition" onClick={() => router.push('/auth/login')}>
            Choose Counsellor
          </button>
        </div>
      </div>

      {/* Next slot */}
      <div className="bg-teal-700 text-white text-center py-2 text-sm rounded-b-2xl">
        Next Available Slot: {nextSlot}
      </div>
    </div>
  );
}
