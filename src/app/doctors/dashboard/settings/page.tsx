'use client';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import SpecializationSelector from './Specializations';
import EditDoctorDescription from '../components/EditDoctorDescription';

export default function DoctorSettingsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: 'Sarang Vinayak Thakare',
    qualifications: '',
    location: 'Hyderabad',
    hospital: '',
    fees: '',
    desc: '',
  });

  const [languages, setLanguages] = useState<string[]>(['Hindi']);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [expValue, setExpValue] = useState<string>('0');
  const [expUnit, setExpUnit] = useState<string>('Years');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (field: string) => {
    setExpandedSection(null);
  };

  const renderRow = (label: string, fieldKey: string, content: React.ReactNode, valueDisplay?: string) => (
    <div className="border-b py-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-medium text-gray-800">{label}</div>
          {expandedSection === fieldKey ? null : (
            <div className="text-gray-600 text-sm mt-1">
              {valueDisplay || 'Not added'}
            </div>
          )}
        </div>
        <button
          className="text-blue-600 font-semibold"
          onClick={() =>
            setExpandedSection(expandedSection === fieldKey ? null : fieldKey)
          }
        >
          {expandedSection === fieldKey ? 'Cancel' : (valueDisplay ? 'Edit' : 'Add')}
        </button>
      </div>
      {expandedSection === fieldKey && (
        <div className="mt-4 space-y-4">{content}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => handleSave(fieldKey)}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-white rounded shadow mt-16">
      <h1 className="text-2xl font-bold mb-4">Edit Doctor Profile</h1>

      {renderRow('Full Name', 'name', (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      ), formData.name)}

      {renderRow('Experience', 'experience', (
        <div className="flex gap-3">
          <input
            type="number"
            name="experienceValue"
            value={expValue}
            onChange={(e) => setExpValue(e.target.value)}
            className="w-2/3 px-3 py-2 border border-gray-300 rounded"
          />
          <select
            name="experienceUnit"
            value={expUnit}
            onChange={(e) => setExpUnit(e.target.value)}
            className="w-1/3 px-3 py-2 border border-gray-300 rounded"
          >
            <option>Years</option>
            <option>Months</option>
          </select>
        </div>
      ), `${expValue} ${expUnit}`)}

      {renderRow('Qualifications', 'qualifications', (
        <input
          type="text"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      ), formData.qualifications)}

      {renderRow('Location', 'location', (
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      ), formData.location)}

      {renderRow('Languages', 'languages', (
        <LanguageSelector selected={languages} setSelected={setLanguages} />
      ), languages.join(', '))}

      {renderRow('Specializations', 'specializations', (
        <SpecializationSelector selected={specializations} setSelected={setSpecializations} />
      ), specializations.join(', '))}

      {renderRow('Hospital Affiliation', 'hospital', (
        <input
          type="text"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      ), formData.hospital)}

      {renderRow('Consultation Fee', 'fees', (
        <input
          type="number"
          name="fees"
          value={formData.fees}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      ), formData.fees ? `₹${formData.fees}` : '')}

      {renderRow('About You', 'desc', (
        <EditDoctorDescription/>
      ), formData.desc)}
    </div>
  );
}
