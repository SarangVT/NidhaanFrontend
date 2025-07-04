import React from 'react';
import { FiUserCheck, FiSmartphone, FiShield, FiVideo, FiRepeat } from 'react-icons/fi';

export default function TrustHighlights() {
  const features = [
    {
      icon: <FiUserCheck className="w-12 h-12 text-teal-600" />,
      title: '24x7 Top Doctors',
      description: 'Connect instantly with trusted doctors anytime.',
    },
    {
      icon: <FiSmartphone className="w-12 h-12 text-teal-600" />,
      title: 'Easy & Convenient',
      description: 'Start a consult in 2 mins or schedule a video visit.',
    },
    {
      icon: <FiShield className="w-12 h-12 text-teal-600" />,
      title: '100% Safe & Private',
      description: 'Your consultation is fully secure and confidential.',
    },
    {
      icon: <FiVideo className="w-12 h-12 text-teal-600" />,
      title: 'Clinic-like Experience',
      description: 'Get a real clinic feel with high-quality video calls.',
    },
    {
      icon: <FiRepeat className="w-12 h-12 text-teal-600" />,
      title: 'Free Follow-up',
      description: 'Includes digital prescription and 7-day free follow-up.',
    },
  ];

  return (
    <div className="py-10 px-6 sm:px-10">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
