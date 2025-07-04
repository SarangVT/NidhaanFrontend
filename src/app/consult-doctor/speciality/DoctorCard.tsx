import React from 'react';

interface DoctorCardProps {
  name: string;
  experience: string;
  languages: string[];
  qualifications: string;
  specializations: string[];
  location: string;
  hospital: string;
  price: string;
  availability: string;
  image: string;
  showInstantBooking?: boolean;
}

export default function DoctorCard({
  name,
  experience,
  qualifications,
  languages,
  specializations,
  location,
  hospital,
  price,
  availability,
  image,
  showInstantBooking = true,
}: DoctorCardProps) {
  return (
    <div className="h-48 w-full max-w-2xl border rounded-lg p-4 flex justify-between items-start gap-4 shadow-sm bg-white">
      <div className="flex gap-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex flex-wrap gap-2 my-1">
            {specializations.map((spec, idx) => (
              <span
                key={idx}
                className="text-sm px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap my-1">
            {languages.map((spec, idx) => (
              <span
                key={idx}
                className="text-sm py-0.5 rounded-full"
              >
                {(idx != 0) ? ", " : ""}{spec}
              </span>
            ))}
          </div>          
          <p className="text-sm text-indigo-600 font-semibold">
            {experience} • {qualifications}
          </p>
          <p className="text-sm text-gray-600">{location}</p>
          <p className="text-sm text-gray-600">{hospital}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between h-full">
        <p className="font-bold text-lg mb-2">₹{price}</p>
        <div className="flex flex-col gap-2">
          {showInstantBooking && (
            <button className="text-white bg-orange-400 text-sm font-semibold rounded-md px-3 py-1 hover:bg-orange-500 transition">
              Book Instantly
              <br />
              <span className="text-white text-xs font-normal">
                Available in {availability}
              </span>
            </button>
          )}
          <button className="bg-teal-700 text-white text-sm font-semibold rounded-md px-3 py-2 hover:bg-teal-800 transition">
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
