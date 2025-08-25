import TestimonialCarousel from "./components/TestimonialCarousel";
import DoubtsIcons from "./DoubtsIcons";
import ImageSlider from "./ImageSlider";
import MostBookedTests from "./MostBookedTests";
import MostRecomendedTests from "./MostRecommendedTests";
import HealthCheckup from "./PersonalizedHealthCheckup";

export default function DiagnosticsHome () {
    return (
        <div className="flex flex-col mx-auto">
            <ImageSlider/>
            <DoubtsIcons/>
            <MostBookedTests/>
            <HealthCheckup/>
            <MostRecomendedTests/>
            <TestimonialCarousel/>
        </div>
    )
}