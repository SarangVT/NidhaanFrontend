import React from 'react';
import DoctorCard from './DoctorCard';

const doctors = [
  {
    name: 'Dr. Liritha C',
    experience: '5 YEARS',
    languages: ['English', 'Hindi'],
    qualifications: 'MBBS, MD (GENERAL MEDICINE)',
    specializations: ['General Physician', 'Internal Medicine'],
    location: 'Hyderabad',
    hospital: 'Apollo 24|7 Virtual Clinic - Telangana, Hyderabad',
    price: '499',
    availability: '8 minutes',
    image: '/MentalHealth/profilePic.png',
    showInstantBooking: true,
  },
  {
    name: 'Dr. Sakshi Menon',
    experience: '12 YEARS',
    languages: ['English', 'Marathi'],
    qualifications: 'MBBS, DNB',
    specializations: ['Dermatologist'],
    location: 'Mumbai',
    hospital: 'Fortis Clinic - Mumbai',
    price: '799',
    availability: '15 minutes',
    image: '/MentalHealth/profilePic.png',
    showInstantBooking: false,
  },
];

export default function DoctorList() {
  return (
    <div className='flex justify-center'>
      <div className="grid grid-cols-1 gap-4 px-4 py-6">
        {doctors.map((doc, idx) => (
          <DoctorCard key={idx} {...doc} />
        ))}
      </div>
    </div>
  );
}
