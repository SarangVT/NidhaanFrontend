'use client';
import React from 'react';

export default function DoctorInfo({ doctor }: { doctor: any }) {
  return (
    <div className="md:w-2/3">
      <div className="flex items-start gap-4">
        <img
          src={doctor.image || '/default-doctor.png'}
          alt={doctor.name}
          className="w-32 h-32 rounded shadow-md object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Dr. {doctor.name}</h1>
          <p className="mt-3 text-teal-500 font-bold text-lg">
            {doctor.specializations?.join(', ')}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <InfoBlock label="Experience" value={doctor.experience} />
        <InfoBlock label="Qualifications" value={doctor.qualifications} />
        <InfoBlock label="Languages" value={doctor.languages?.join(', ')} />
        <InfoBlock label="Hospital" value={doctor.hospital} />
        <InfoBlock label="Location" value={doctor.location} />
        <InfoBlock label="Registration No" value={doctor.registrationNo} />

        <div>
          <p className="text-teal-500 font-bold text-lg">Consultation Fees</p>
          <p className="font-semibold">₹{doctor.fees}</p>
        </div>

        <div className="pt-2">
          <p className="text-teal-500 font-bold text-2xl">
            About {doctor.name}
          </p>
          <p className="font-semibold pl-2 mt-2">{doctor.description}</p>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-teal-500 font-bold text-lg">{label}</p>
      <p className="font-semibold">{value}</p>
      <hr className="my-2 text-gray-300" />
    </div>
  );
}
