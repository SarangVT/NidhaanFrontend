import { useState } from "react";

export const AVAILABLE_SPECIALIZATIONS = [
  'General Physician',
  'Cardiologist',
  'Endocrinologist',
  'Orthopedic',
  'Dermatologist',
  'Sexologist',
  'Pain Specialist',
  'Pulmonologist',
  'Gastroenterologist',
  'Gynaecologist',
  'Pediatrician',
  'ENT Specialist',
  'Proctologist',
  'Nephrologist',
  'Dentist',
  'Neurologist',
  'Dietitian'
];

export default function SpecializationSelector({ selected, setSelected }: {
  selected: string[];
  setSelected: (val: string[]) => void;
}) {
  const toggleSpecialization = (lang: string) => {
    if (selected.includes(lang)) {
      setSelected(selected.filter(l => l !== lang));
    } else {
      setSelected([...selected, lang]);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-md font-medium mb-4">Specializations</p>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_SPECIALIZATIONS.map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => toggleSpecialization(lang)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              selected.includes(lang)
                ? "bg-teal-600 text-white border-teal-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      <input
        type="hidden"
        name="languages"
        value={selected.join(",")}
      />
    </div>
  );
}
