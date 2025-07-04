// components/CommonIllnesses.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

type Illness = {
  title: string;
  image: string;
  link: string;
};

const illnesses: Illness[] = [
  {
    title: 'Cough & Cold?',
    image: '/images/cough-cold.jpg',
    link: '#',
  },
  {
    title: 'Period problems?',
    image: '/images/period.jpg',
    link: '#',
  },
  {
    title: 'Performance issues in bed?',
    image: '/images/bed-performance.jpg',
    link: '#',
  },
  {
    title: 'Skin problems?',
    image: '/images/skin.jpg',
    link: '#',
  },
];

function CommonIllnessCard({ title, image, link }: Illness) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition">
      <div className="w-full h-40 relative rounded-t-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-1">
        <p className="font-bold">{title}</p>
        <Link href={link} className="text-teal-500 text-sm font-semibold inline-flex items-center gap-1">
          Consult Now <FiArrowRight className="mt-[1px]" />
        </Link>
      </div>
    </div>
  );
}

export default function CommonIllnesses() {
  return (
    <div className='flex justify-center'>
        <div className=" w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto mt-6">
        {illnesses.map((illness, idx) => (
            <CommonIllnessCard key={idx} {...illness} />
        ))}
        </div>
    </div>
  );
}
