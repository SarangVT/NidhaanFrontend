"use client";
import Image from "next/image";

type HealthCardProps = {
  image: string;
  label: string;
};

function HealthCard({ image, label }: HealthCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
      <Image
        src={image}
        alt={label}
        width={250}
        height={280}
        className="object-cover w-full h-[280px]"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow text-sm font-medium">
        {label}
      </div>
    </div>
  );
}

type CategorySectionProps = {
  title: string;
  items: { image: string; label: string }[];
};

function CategorySection({ title, items }: CategorySectionProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-teal-700 uppercase">{title}</h3>
        <button className="text-teal-600 border border-teal-600 px-4 py-1 rounded-lg hover:bg-teal-50 transition">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <HealthCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function HealthCheckup() {
  const mensHealth = [
    { image: "/images/mens-under30.png", label: "Under 30 years" },
    { image: "/images/mens-30-45.png", label: "Age 30-45" },
    { image: "/images/mens-45-60.png", label: "Age 45-60" },
    { image: "/images/mens-above60.png", label: "Above 60 years" },
  ];

  const womensHealth = [
    { image: "/images/womens-under30.png", label: "Under 30 years" },
    { image: "/images/womens-30-45.png", label: "Age 30-45" },
    { image: "/images/womens-45-60.png", label: "Age 45-60" },
    { image: "/images/womens-above60.png", label: "Above 60 years" },
  ];

  return (
    <section className="py-12 px-6 bg-teal-50">
      <div className="text-center mb-12">
        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium uppercase">
          Packages
        </span>
        <h2 className="text-2xl font-bold mt-3 text-gray-800">
          Personalized Health Checkup
        </h2>
      </div>

      <CategorySection title="Men's Health" items={mensHealth} />
      <CategorySection title="Women's Health" items={womensHealth} />
    </section>
  );
}
