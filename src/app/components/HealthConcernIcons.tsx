import { FaDumbbell } from "react-icons/fa";
import { i1, i2, i3} from "../../../assets/HealthConcernIcons/HealthConcernIcons";
import Image from "next/image";

export default function HealthConcernIcons () {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 justify-around px-10 gap-4 py-8">
            <div className="flex flex-row w-48 h-20 px-2 py-2 bg-[#DDEB9D] rounded-lg font-bold items-center">
                <Image src={i1} alt={"Doctor Appointment"} className="h-14 w-24"/>
                 <div className="px-4 rounded-lg flex items-center">
                    Doctor appointment
                </div>
            </div>
            <div className="flex flex-row w-48 h-20 px-2 py-2 bg-[#C68EFD] rounded-lg font-bold items-center">
                <Image src={i2} alt={"Order Medicines"} width={70} height={80}/>
                 <div className="px-4 rounded-lg flex items-center">
                    Order Medicines
                </div>
            </div>
            <div className="flex flex-row w-48 h-20 px-2 py-2 bg-[#A8F1FF] rounded-lg font-bold items-center">
                <Image src={i3} alt={"Mental Peace"} width={40} height={44}/>
                 <div className="px-4 rounded-lg flex items-center">
                    Mental Peace
                </div>
            </div>
            <div className="flex flex-row w-48 h-20 px-2 py-2 bg-[#FFC1DA] rounded-lg font-bold items-center">
                <FaDumbbell className="w-8 h-8 text-gray-700" />
                <div className="px-4 rounded-lg flex items-center">
                    Yoga and Gym
                </div>
            </div>
        </div>
    )
}