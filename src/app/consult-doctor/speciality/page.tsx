'use client'
import React, { useEffect, useState, useMemo } from 'react';
import DoctorCard from './DoctorCard';
import { useUserData } from '@/app/lib/contexts/UserContext';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { categoryToSpeciality } from './utils';

const FETCH_DOCTORS = gql`
query FetchDoctors($specialities: [String!]) {
  fetchDoctorsBySpeciality(specialities: $specialities) {
    id
    name
    experience
    languages
    qualifications
    specializations
    location
    hospital
    fees
    availability
    image
  }
}
`;

const experienceOptions = [
  { label: '0-5', range: [0, 5] },
  { label: '6-10', range: [6, 10] },
  { label: '11-16', range: [11, 16] },
  { label: '16+', range: [17, Infinity] },
];

const feesOptions = [
  { label: '100-500', range: [100, 500] },
  { label: '500-1000', range: [500, 1000] },
  { label: '1000+', range: [1001, Infinity] },
];

const languageOptions = ['English', 'Hindi', 'Telugu'];

export default function DoctorList() {
  const { selectedSpecialities } = useUserData();
  const router = useRouter();
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedSpecialities || selectedSpecialities.length === 0) {
      router.replace('/consult-doctor/book-appointment');
    }
  }, [selectedSpecialities, router]);

  const mappedSpecialities = selectedSpecialities?.flatMap(
    (cat) => categoryToSpeciality[cat] || []
  ) || [];

  const { data, loading, error } = useQuery(FETCH_DOCTORS, {
    variables: { specialities: mappedSpecialities },
    skip: mappedSpecialities.length === 0,
    fetchPolicy: 'cache-and-network',
  });

  const doctors = data?.fetchDoctorsBySpeciality || [];
  console.log(doctors);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc: any) => {
      const exp = parseInt(doc.experience) || 0;
      const fee = parseInt(doc.fees) || 0;
      const lang = doc.languages || [];

      const expMatch =
        selectedExperience.length === 0 ||
        selectedExperience.some((label) => {
          const [min, max] = experienceOptions.find((o) => o.label === label)!.range;
          return exp >= min && exp <= max;
        });

      const feeMatch =
        selectedFees.length === 0 ||
        selectedFees.some((label) => {
          const [min, max] = feesOptions.find((o) => o.label === label)!.range;
          return fee >= min && fee <= max;
        });

      const langMatch =
        selectedLanguages.length === 0 ||
        selectedLanguages.some((l) => lang.includes(l));

      return expMatch && feeMatch && langMatch;
    });
  }, [doctors, selectedExperience, selectedFees, selectedLanguages]);

  if (loading) return <p className="text-center">Loading doctors...</p>;
  if (error) return <p className="text-center text-red-500">Error loading doctors</p>;

  return (
    <div className="flex w-full">
    <div className="hidden md:block w-1/4 p-12 border-r border-gray-200 rounded-l-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Experience (Years)</h3>
        {experienceOptions.map((exp) => (
          <label key={exp.label} className="flex items-center mb-2 text-gray-700 font-medium">
            <input
              type="checkbox"
              value={exp.label}
              checked={selectedExperience.includes(exp.label)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedExperience((prev) =>
                  prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value]
                );
              }}
              className="w-5 h-5 mr-3 accent-blue-500"
            />
            {exp.label}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Fees (₹)</h3>
        {feesOptions.map((fee) => (
          <label key={fee.label} className="flex items-center mb-2 text-gray-700 font-medium">
            <input
              type="checkbox"
              value={fee.label}
              checked={selectedFees.includes(fee.label)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedFees((prev) =>
                  prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value]
                );
              }}
              className="w-5 h-5 mr-3 accent-blue-500"
            />
            {fee.label}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Language</h3>
        {languageOptions.map((lang) => (
          <label key={lang} className="flex items-center mb-2 text-gray-700 font-medium">
            <input
              type="checkbox"
              value={lang}
              checked={selectedLanguages.includes(lang)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedLanguages((prev) =>
                  prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value]
                );
              }}
              className="w-5 h-5 mr-3 accent-blue-500"
            />
            {lang}
          </label>
        ))}
      </div>
    </div>


      {/* Doctor List */}
      <div className="w-full md:w-3/4 flex justify-center">
        <div className="grid grid-cols-1 gap-4 px-4 py-6 w-full">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc: any, idx: number) => (
              <DoctorCard key={idx} {...doc}/>
            ))
          ) : (
            <p className="text-center text-gray-500">No doctors found</p>
          )}
        </div>
      </div>
    </div>
  );
}
