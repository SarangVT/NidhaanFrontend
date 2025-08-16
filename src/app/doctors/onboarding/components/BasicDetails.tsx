"use client";
import { useState } from "react";
import LanguageSelector from "../../dashboard/settings/LanguageSelector";
import SpecializationSelector from "../../dashboard/settings/Specializations";
import { gql, useMutation } from "@apollo/client";
import { useDoctorData } from "@/app/lib/contexts/DoctorContext";
import { useRouter } from "next/navigation";

const CREATE_BASIC_DETAILS = gql`
  mutation CreateBasicDetails(
    $id: Int!
    $name: String!
    $qualifications: String!
    $specializations: [String!]!
    $location: String!
    $hospital: String!
    $fees: Int!
    $desc: String!
    $languages: [String!]!
    $experience: String!
  ) {
    createBasicDetails(
      id: $id
      name: $name
      qualifications: $qualifications
      specializations: $specializations
      location: $location
      hospital: $hospital
      fees: $fees
      desc: $desc
      languages: $languages
      experience: $experience
    ) {
      id
    }
  }
`;

export default function DoctorBasicDetails({currentStep, setCurrentStep}: {currentStep: number, setCurrentStep: (index: number)=> void}) {
  const { DoctorId } = useDoctorData();
  const router = useRouter();
  const [saveError, setSaveError] = useState("");
  const [formData, setFormData] = useState({
    id: DoctorId || 0,
    name: "",
    qualifications: "",
    location: "",
    hospital: "",
    fees: "",
    desc: "",
  });

  const [languages, setLanguages] = useState<string[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [expValue, setExpValue] = useState<string>("0");
  const [expUnit, setExpUnit] = useState<string>("Years");

  const [createBD, { loading, error }] = useMutation(CREATE_BASIC_DETAILS);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!DoctorId) {
      router.push("/doctors/login");
      return;
    }
    if (
      !formData.name ||
      !formData.qualifications ||
      !formData.location ||
      !formData.hospital ||
      !formData.fees ||
      !formData.desc ||
      specializations.length === 0 ||
      languages.length === 0
    ) {
      setSaveError("Please fill in all required fields.");
      return;
    }
    const payload = {
      ...formData,
      fees: parseInt(formData.fees),
      specializations,
      languages,
      experience: `${expValue} ${expUnit}`,
    };
    try {
      await createBD({ variables: payload });
      setCurrentStep(currentStep + 1);
    } catch (err) {
      console.error("Error submitting details:", err);
    }
  };

  return (
    <div className="flex flex-col">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8">
    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            required
            />
    </div>
    <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">Experience</label>
    <div className="flex gap-3">
        <input
        type="number"
        name="experienceValue"
        value={expValue}
        onChange={(e) => setExpValue(e.target.value)}
        min={0}
        placeholder="e.g. 5"
        className="w-2/3 mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        required
        />
        <select
        name="experienceUnit"
        value={expUnit}
        onChange={(e) => setExpUnit(e.target.value)}
        className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
        >
        <option value="years">Years</option>
        <option value="months">Months</option>
        </select>
    </div>
    </div>
    <div className="space-y-1">
        <label htmlFor="qualifications" className="text-md font-semibold text-gray-700">
            Qualifications
        </label>
        <input
            type="text"
            name="qualifications"
            id="qualifications"
            placeholder="e.g., MBBS, MD (Cardiology), FRCS (UK)"
            value={formData.qualifications}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            required
        />
    </div>
    <div className="space-y-1">
        <label htmlFor="location" className="text-md font-semibold text-gray-700">
            Location
        </label>
        <input
            type="text"
            name="location"
            id="location"
            placeholder="Hyderabad"
            value={formData.location}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            required
        />
    </div>
    <LanguageSelector selected={languages} setSelected={setLanguages} />
    <SpecializationSelector selected={specializations} setSelected={setSpecializations} />

    <div className="space-y-1">
        <label htmlFor="work" className="text-md font-semibold text-gray-700">
            Hospital Affiliation
        </label>
        <input
            type="text"
            name="hospital"
            id="work"
            placeholder="e.g., AIIMS Delhi, Dr. Mehta’s Clinic or Independent Practice"
            value={formData.hospital}
            onChange={handleChange}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            required
        />
    </div>
    <div className="space-y-1">
      <label htmlFor="fees" className="text-md font-semibold text-gray-700">Consultation Fee</label>
      <input
        type="number"
        min="0"
        name="fees"
        id="fees"
        placeholder="Consultation Fee (In INR)"
        value={formData.fees}
        onChange={handleChange}
        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
      />
    </div>
    </div>
    <div className="space-y-1 mt-2">
      <label htmlFor="desc" className="text-md font-semibold text-gray-700">
        About You
      </label>
      <textarea
        name="desc"
        id="desc"
        rows={8}
        placeholder="Write a short bio about your medical background, areas of expertise, and your approach to patient care."
        value={formData.desc}
        onChange={handleChange}
        className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 placeholder-gray-400 resize-none"
        required
      />
    </div>
    <div className="flex flex-col items-center mt-12">
      {saveError && (
        <p className="text-red-600 text-md font-medium mb-3 text-center">
          {saveError}
        </p>
      )}
      <button
        onClick={handleSubmit}
        className="w-full max-w-md bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-xl"
      >
        Save and Continue
      </button>
    </div>
    </div>
  );
}
