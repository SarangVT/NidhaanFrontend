import { FaPhoneAlt } from 'react-icons/fa';
import Image from 'next/image';
import DoctorBanner from "./DoctorBanner.png"

export default function FindDoctor() {
    console.log(5)
  return (
    <div className="w-[80%] rounded-2xl bg-gradient-to-r from-orange-300 to-orange-400 flex flex-col md:flex-row items-center justify-between px-6 py-4 md:py-6 overflow-hidden">
      <div className="text-center md:text-left space-y-3 md:space-y-4 max-w-md">
        <h2 className="text-xl md:text-2xl font-semibold text-black">
          Find the right doctor for your ailments
        </h2>
        <p className="flex items-center justify-center md:justify-start gap-2 text-black">
          <FaPhoneAlt className="text-black" />
          <span>
            Call <span className="font-semibold">+91-8040245807</span> to book an appointment
          </span>
        </p>
      </div>
      <div className="mt-6 md:mt-0">
        <Image
          src={DoctorBanner}
          alt="Doctors"
          width={480}
          height={300}
          className="max-h-[100px] w-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
