import Image from 'next/image';
import Link from 'next/link';
import GetRegistered from "./GetRegistered.gif";
import InfoGrid from './components/InfoGrid';
import TestimonialCarousel from './components/TestimonialCarousel';
import Timeline from './components/Timeline';

function Tagline() {
  return (
    <div className="relative mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
              “Connecting Care,
            </span>{" "}
            Empowering Providers”
          </h1>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full h-1 bg-teal-400 rounded-full"></div>
        </div>
  );
}

export default function DoctorHomepage() {
  return (
    <div className='flex flex-col bg-teal-50'>
    <section className="flex flex-col md:flex-row justify-between px-6 md:px-28 py-16 gap-10 min-h-screen">
      <div className="flex-1 flex flex-col justify-between max-w-xl py-12">
        <Tagline/>
        <p className="text-lg font-semibold">
          Login or register as a doctor on Nidhaan with valid medical license, proof of education, bank details.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="doctors/login">
            <button className="bg-teal-400 hover:bg-teal-500 text-black font-semibold text-lg py-3 px-6 rounded-full">
              Start Caring
            </button>
          </Link>
          <Link href="/">
            <button className="bg-white text-black font-semibold text-lg py-3 px-6 rounded-full">
              Know More
            </button>
          </Link>
        </div>
        <div className="text-sm text-gray-700">
          *T&amp;C Apply
        </div>
      </div>

      <div className="w-full flex-1 justify-center items-center">
        <Image
            src={GetRegistered}
            alt="Doctor Journey"
            className="rounded-xl object-contain w-full h-84 md:h-96"
        />
        </div>
    </section>
    <div className='px-28'><InfoGrid/></div>
    <div className='px-28'><TestimonialCarousel/></div>
    <div className='px-28'><Timeline/></div>
    </div>
  );
}