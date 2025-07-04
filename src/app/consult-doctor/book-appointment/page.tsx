import CommonIllnesses from "./CommonIllness";
import FindDoctor from "./FindDoctor";
import SpecialityCategory from "./SpecialityCategory";

export default function BookAppointment () {
    return (
        <div className="flex flex-col">
            <div className="flex justify-center my-4"><FindDoctor/></div>
            <div className="flex justify-center py-4">
            <p className="w-[85%] font-bold text-2xl">Select Your Health Concerns</p>
            </div>
            <SpecialityCategory/>
            <div className="flex justify-center py-4 mt-24">
            <p className="w-[85%] font-bold text-2xl">Common Health Concerns</p>
            </div> 
            <CommonIllnesses/>
        </div>
    )
}
