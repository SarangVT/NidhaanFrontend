"use client"
import React, { useState } from 'react';
import QuestionAns from './QuestionAns';
import { useRouter } from 'next/navigation';

const Questions = [
  'How often have you felt anxious recently?',
  'Do you experience trouble sleeping?',
  'Do you feel overwhelmed frequently?',
  'How often do you feel hopeful?',
  'Do you have someone to talk to regularly?',
  'How often do you feel down or depressed?',
  'Do you find joy in everyday activities?',
  'Do you feel emotionally supported?'
];

const Options = [
  ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  ['Not at all', 'A little', 'Moderately', 'Quite a bit', 'Extremely'],
  ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  ['No one', 'Occasionally', 'A few people', 'Often', 'Always have someone'],
  ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
  ['Not really', 'A little', 'Sometimes', 'Often', 'Absolutely'],
  ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
];

export default function QuestionsComponent() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(Questions.length).fill(null));

  const handleNext = () => {
    if (current < Questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const progress = ((current + 1) / Questions.length) * 100;

  return (
    <div className="min-h-screen p-6 sm:p-8 bg-gradient-to-r from-[#d3f1ee] to-[#fbfbfb] flex flex-col gap-12">
      <div className='mb-8'></div>
      <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 mb-6 pl-12">
        Let’s explore your thoughts together.
      </h1>

      <div className="flex flex-col lg:flex-row w-full px-4 sm:px-12 gap-12">
        {/* Question and buttons */}
        <div className="flex flex-col flex-1 items-start">
          <div className="w-full max-w-xl">
            <QuestionAns
              question={Questions[current]}
              options={Options[current]}
              selected={answers[current]}
              onSelect={(option: any) => {
                setAnswers(prev => {
                  const updated = [...prev];
                  updated[current] = option;
                  return updated;
                });
              }}
            />
          </div>

          <div className="mt-6 w-full max-w-xl flex justify-end gap-4">
            {current > 0 && (
              <button
                onClick={handleBack}
                className="px-8 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              >
                Back
              </button>
            )}
            {current < Questions.length - 1 && (
              <button
                onClick={handleNext}
                disabled={!answers[current]}
                className={`px-8 py-2 rounded-lg transition ${
                  answers[current]
                    ? 'bg-teal-500 text-white hover:bg-teal-600'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            )}
            {current === Questions.length - 1 && (
              <button
                onClick={() => router.push('/mental-health/preferences')}
                disabled={!answers[current]}
                className={`px-8 py-2 rounded-lg transition ${
                  answers[current]
                    ? 'bg-teal-500 text-white hover:bg-teal-600'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                Finish
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full lg:w-1/3 self-center lg:self-start">
          <span className="font-bold text-xl block mb-2 text-center lg:text-left">Progress</span>
          <div className="h-4 bg-gray-200 rounded-full w-full">
            <div
              className="h-4 bg-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
