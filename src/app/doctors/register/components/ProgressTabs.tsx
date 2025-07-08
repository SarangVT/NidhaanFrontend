'use client';
import React from 'react';

const steps = [
  'Basic Details',
  'Document Verification',
  'Bank Details',
];

export default function ProgressTabs ({ currentStep, setCurrentStep }: {currentStep: number, setCurrentStep: (index: number) => void}) {
  return (
    <div className="flex justify-around items-center w-full py-4">
      {steps.map((step, index) => (
        <div key={index} className="text-center flex flex-col items-center" onClick={() => {setCurrentStep(index)}}>
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center 
              ${index <= currentStep ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-600'}`}
          >
            {index + 1}
          </div>
          <span
            className={`mt-1 text-sm ${index <= currentStep ? 'font-bold' : 'text-gray-500'}`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};
