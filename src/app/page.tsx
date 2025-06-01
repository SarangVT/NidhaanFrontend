import Image from "next/image";
import AuthNavbar from "./topNavbar";
import ServicesNavbar from "./servicesNavbar";
import ImageSlider from "./components/HomepageImageSlider";
import StatisticsCount from "./components/StatisticsCount";
import HealthConcernIcons from "./components/HealthConcernIcons";

export default function Home() {
  return (
    <div>
      <ImageSlider/>
      <HealthConcernIcons/>
      <StatisticsCount/>
    </div>
  )
}
