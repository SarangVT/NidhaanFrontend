import { FaArrowRight } from 'react-icons/fa';

export default function InfoCard({
  icon,
  title,
  description,
  linkText,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  href: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-3 hover:shadow-lg transition">
      <div className="text-3xl text-black">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <a href={href} className="text-md font-semibold text-black flex items-center gap-2 hover:font-bold">
        {linkText} <FaArrowRight className="text-xs" />
      </a>
    </div>
  );
}
