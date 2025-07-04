import { FaLinkedin } from "react-icons/fa"
import { i1, i2, i3, i4, i5} from "../../../assets/FooterIcons/FooterIcons"
import Image from "next/image"
// />> --master-key P-AmW6JgciyRY-uQKo0gs32GtaAR-f8fvpCgk4bXsTw <<
export default function Footer () {
    return (
        <div className="flex flex-col mt-auto bg-[#0B192C] text-white">
            <hr className="border-t-2 border-green-700 w-[70%] mx-auto" />
            <div className="flex flex-row justify-around">
                <div className="text-xl font-bold">
                    <Image src={i5} alt={"Nidhaan.png"} className="w-20 h-20 mt-12"/>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-start text-2xl font-bold py-10">Follow Us</div>
                    <div className="flex flex-row gap-8 justify-start">
                        <Image src={i1} alt={""} className="w-12 h-12"/>
                        <Image src={i2} alt={""} className="w-12 h-12"/>
                        <Image src={i3} alt={""} className="w-12 h-12"/>
                        <Image src={i4} alt={""} className="w-12 h-12"/>
                    </div>
                </div>
            </div>
            <div className="font-bold mx-auto p-10">&copy; 2025. All rights reserved with XPedicr Industry Pvt. Ltd</div>
        </div>
    )
}