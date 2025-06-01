import { FaDumbbell } from "react-icons/fa";
import i1 from "./brand.png";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

export default function SearchBrands() {
  const router = useRouter();
  const Icons = [
    { title: "Dolo 650", src: i1 },
    { title: "Glucon-D", src: i1 },
    { title: "Digene", src: i1 },
    { title: "Volini", src: i1 },
    { title: "Sensodyne", src: i1 },
    { title: "Vicks Vaporub", src: i1 },
    { title: "Manforce", src: i1 },
    { title: "Revital H", src: i1 },
    { title: "Liv 52", src: i1 },
    { title: "Chyawanprash", src: i1 },
  ];

  const Icon = (title: string, src: StaticImageData) => {
    return (
      <div className="shadow-xl flex flex-col justify-around w-full max-w-xs aspect-[4/3] p-3 border border-gray-400 rounded-lg font-bold items-center mx-auto">
        <Image alt={"Brands"} src={src} className="h-24 w-auto object-contain" />
        <div className="mt-2 text-center">{title}</div>
      </div>
    );
  };

  return (
    <div className="lg:px-28 px-4">
      <div className="font-bold text-2xl py-10">Shop brands you prefer</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Icons.map((item, idx) => (
          <div key={idx} onClick={() => router.push(`/pharmacy/categories?id=${idx}`)}>{Icon(item.title, item.src)}</div>
        ))}
      </div>
    </div>
  );
}
