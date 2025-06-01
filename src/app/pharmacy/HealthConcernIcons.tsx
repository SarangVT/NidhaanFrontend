import { FaDumbbell } from "react-icons/fa";
import { i1, i2, i3} from "../../../assets/HealthConcernIcons/HealthConcernIcons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HealthConcernIcons() {
  const router = useRouter();
  const Icons = [
    { title: "Cardiac Care", src: i1 },
    { title: "Diabetes Care", src: i2 },
    { title: "Stomach Care", src: i3 },
    { title: "Pain Relief", src: i1 },
    { title: "Oral Care", src: i2 },
    { title: "Respiratory", src: i3 },
    { title: "Sexual Health", src: i1 },
    { title: "Elderly Care", src: i2 },
    { title: "Liver Care", src: i3 },
    { title: "Cold & Immunity", src: i1 },
  ];

  return (
    <div>
      <div className="font-bold text-2xl py-10 px-0">Find by Health Concerns</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
        {Icons.map((item, idx) => (
          <div
            key={idx}
            onClick={() => router.push(`/pharmacy/categories?id=${idx}`)}
            className="shadow-xl flex w-full h-20 px-2 py-2 border border-gray-300 rounded-lg font-bold items-center bg-white"
          >
            <Image src={item.src} alt={item.title} className="h-10 w-10 object-contain" />
            <div className="px-4">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
