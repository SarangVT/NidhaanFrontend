import React from 'react';
import { FiShield, FiCheckCircle, FiThumbsUp, FiFileText } from 'react-icons/fi';

export default function TrustHighlights() {
const features = [
  {
    icon: <FiShield className="w-12 h-12 text-teal-600" />,
    title: '100% Privacy & Secure',
    description:
      "We value your feelings and privacy and ensure your data doesn't leak anywhere.",
  },
  {
    icon: <FiCheckCircle className="w-12 h-12 text-teal-600" />,
    title: 'Certified Experts',
    description: 'Therapists are verified professionals with accredited qualifications.',
  },
  {
    icon: <FiThumbsUp className="w-12 h-12 text-teal-600" />,
    title: 'Positive Reviews',
    description: 'Thousands of users have reported better mental wellness outcomes.',
  },
  {
    icon: <FiFileText className="w-12 h-12 text-teal-600" />,
    title: 'Insurance Covered',
    description: 'Covered by various companies and accepted by major insurers.',
  },
];

  return (
    <div className="py-10 px-6 sm:px-10">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start sm:items-center text-left sm:text-center"
          >
            <div className="mb-2">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
