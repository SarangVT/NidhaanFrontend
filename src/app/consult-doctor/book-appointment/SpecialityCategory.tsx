'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useUserData } from '@/app/lib/contexts/UserContext';

type DoctorCategoryCardProps = {
  image: string;
  title: string;
  description: string;
  selected: boolean;
  onToggle: () => void;
};

export function DoctorCategoryCard({
  image,
  title,
  description,
  selected,
  onToggle,
}: DoctorCategoryCardProps) {
  return (
    <div
      onClick={onToggle}
      className={`flex items-start gap-4 p-4 m-4 rounded-xl border relative cursor-pointer transition-all ${
        selected ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-black'
      }`}
    >
      <Image
        src={image}
        alt={title}
        width={64}
        height={64}
        className="rounded-md object-cover w-16 h-16"
      />

      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-medium text-black">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="absolute top-3 right-3">
        <span
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            selected ? 'border-black bg-black' : 'border-gray-400'
          }`}
        >
          {selected && <FaCheck className="text-white text-xs" />}
        </span>
      </div>
    </div>
  );
}

export const categories = [
  {
    image: '/ConsultDoctor/GeneralPhysician.png',
    title: 'General Symptoms',
    description: 'Fever, Cough-Cold, Wound/Cut injury, Vomiting',
  },
  {
    image: '/ConsultDoctor/BP.png',
    title: 'BP & Heart-related Issues',
    description: 'High BP, Low BP, Chest Pain, Excessive Heart rate',
  },
  {
    image: '/ConsultDoctor/Diabetes.png',
    title: 'Diabetes',
    description: 'Diabetes, Thyroid issues, Osteoporosis, Rickets',
  },
  {
    image: '/ConsultDoctor/Bone.png',
    title: 'Bone & Joint-related Issues',
    description: 'Joint pain, Muscle pain, Arthritis, Limited joint movement',
  },
  {
    image: '/ConsultDoctor/Skin.png',
    title: 'Skin & Hair Fall Issues',
    description: 'Hair fall, Itching all over body, Acne, Rashes',
  },
  {
    image: '/ConsultDoctor/SHealth.png',
    title: 'Sexual Problems',
    description: 'Erection problems, Premature ejaculation, Burning sensation in urine, Vaginal dryness',
  },
  {
    image: '/ConsultDoctor/Pain.png',
    title: 'Pain Management',
    description: 'Pain, Discomfort, Back pain, Neck pain, Joint pain',
  },
  {
    image: '/ConsultDoctor/Breath.png',
    title: 'Breathing-related Issues',
    description: 'Bronchial asthma, COPD, Running nose, Blocked nose',
  },
  {
    image: '/ConsultDoctor/Digestion.png',
    title: 'Digestion & Liver Issues',
    description: 'Abdominal Pain, Loose motion, Constipation, Jaundice',
  },
  {
    image: '/ConsultDoctor/Female.png',
    title: 'Female-specific Problems',
    description: 'Menstrual Irregularities, Pregnancy issues, PCOD, Menopause',
  },
  {
    image: '/ConsultDoctor/Pediatrics.png',
    title: 'Paediatric Illness',
    description: 'Not gaining weight-height, Weaning issues, Pre-pubertal problems, Allergies',
  },
  {
    image: '/ConsultDoctor/Eye.png',
    title: 'Eye/Ear/Throat-related Issues',
    description: 'Sore throat, Eye strain, Red eye, Bleeding from nose',
  },
  {
    image: '/ConsultDoctor/Piles.png',
    title: 'Piles',
    description: 'Irritable bowel disease, Peptic ulcer, Piles, Anal fissure',
  },
  {
    image: '/ConsultDoctor/Kidney.png',
    title: 'Kidney Issues',
    description: 'Kidney stones, Stone in gall bladder, Stone in kidney, Increased frequency of urine',
  },
  {
    image: '/ConsultDoctor/Dentist.png',
    title: 'Dental Care',
    description: 'Tooth pain or sensitivity, bleeding gums, mouth sores, loose or shifting teeth',
  },
  {
    image: '/ConsultDoctor/Brain.png',
    title: 'Neurological Illnesses',
    description: 'Anxiety, Stress, Dizziness, Sleep disorders',
  },
  {
    image: '/ConsultDoctor/Weight.png',
    title: 'Weight Management',
    description: 'Obesity, Heart & Joint Problems',
  },
];

export default function SpecialityCategory() {
  const router = useRouter();
  const { setSelectedSpecialities } = useUserData();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    setSelectedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmit = () => {
    const selectedCategories = selectedIndexes.map((i) => categories[i].title);
    setSelectedSpecialities(selectedCategories);
    router.push(`/consult-doctor/speciality`);
  }
  
  return (
    <div className="w-full flex flex-col items-center">
    <div className="w-[80%] grid grid-cols-1 lg:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
        <DoctorCategoryCard
            key={idx}
            {...cat}
            selected={selectedIndexes.includes(idx)}
            onToggle={() => toggleSelect(idx)}
        />
        ))}
    </div>

    <button className="mt-6 px-32 py-3 font-bold bg-teal-500 text-white rounded-lg shadow-lg shadow-gray-500" onClick={handleSubmit}>
        Book A Consultation
    </button>
    </div>
  );
}
