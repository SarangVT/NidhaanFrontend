import React, { Key, useState } from 'react';

type QuestionAnsProps = {
  question: String, options: String [], selected: any, onSelect: any
}

export default function QuestionAns({ question, options, selected, onSelect }: QuestionAnsProps) {
  return (
    <div className="w-full bg-white p-6 rounded-2xl pl-12">
      <p className="text-xl font-bold mb-4 text-gray-800">{question}</p>
      <div className="space-y-3 mb-6">
        {options.map((opt: any, idx: Key) => (
          <label
            key={idx}
            className="flex items-center space-x-4 p-3 cursor-pointer transition-all"
          >
            <input
              type="checkbox"
              checked={selected === opt}
              onChange={() => onSelect(selected === opt ? null : opt)}
              className="w-6 h-6 accent-teal-600"
            />
            <span className="text-lg text-gray-600">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
