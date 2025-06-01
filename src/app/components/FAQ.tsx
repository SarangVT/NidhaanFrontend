'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const faqs: FAQItem[] = [
    {
      question: 'Is online medicine delivery safe?',
      answer:
        'Nidhaan Pharmacy states that all medicines/products are thoroughly inspected for authenticity and quality and that strict safety protocols are followed during delivery.',
    },
    {
      question: 'How do I know if there is a delay in delivery?',
      answer:
        'Customers will be contacted via SMS, call, or email if their order is delayed, and they can also check the order status on the website.',
    },
    {
      question: 'Can Nidhaan Pharmacy provide express delivery?',
      answer:
        'Express delivery is available in select cities, with delivery times as short as 1 hour, depending on factors like medicine and staff availability.',
    },
    {
      question: 'How can I buy Nidhaan Pharmacy products?',
      answer:
        "Products can be purchased in-person at a Nidhaan Pharmacy outlet or on the website by clicking on the 'Buy Medicines' section.",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="sm:p-2 lg:p-8">
      <div className="font-bold text-teal-600 text-2xl p-10">
        Frequently Asked Questions
      </div>
      {faqs.map((faq, index) => (
        <div key={index} className="flex flex-col mb-4">
          <div
            className="flex justify-between items-center cursor-pointer px-14"
            onClick={() => handleToggle(index)}
          >
            <span className="font-bold text-lg">{faq.question}</span>
            <span className="text-2xl font-bold">
              {activeIndices.includes(index) ? '-' : '+'}
            </span>
          </div>
          {activeIndices.includes(index) && (
            <div className="mt-2 text-black px-20">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
