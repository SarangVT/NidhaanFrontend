import Image from 'next/image';
import Link from 'next/link';
import GetRegistered from "./GetRegistered.gif";
import InfoGrid from './components/InfoGrid';
import TestimonialCarousel from './components/TestimonialCarousel';
import Timeline from './components/Timeline';

export default function SellerHomepage() {
  return (
    <div className='flex flex-col bg-[#070F2B]'>
    <section className="text-white flex flex-col md:flex-row justify-between px-6 md:px-28 py-16 gap-10 min-h-screen">
      <div className="flex-1 flex flex-col justify-between max-w-xl py-12">
        <h1 className="text-4xl font-bold leading-tight">
          Begin your selling journey on Nidhaan
        </h1>
        <p className="text-lg">
          Login or register as a seller on Nidhaan with a valid Drug License, GSTIN, and bank account.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="seller/register">
            <button className="bg-teal-400 hover:bg-teal-500 text-black font-semibold text-lg py-3 px-6 rounded-full">
              Start selling
            </button>
          </Link>
          <Link href="/seller/info">
            <button className="bg-white text-black font-semibold text-lg py-3 px-6 rounded-full">
              Know More
            </button>
          </Link>
        </div>
        <div className="text-sm text-gray-300">
          *T&amp;C Apply
        </div>
      </div>

      <div className="w-full flex-1 justify-center items-center">
        <Image
            src={GetRegistered}
            alt="Seller Journey"
            className="rounded-xl object-contain w-full"
        />
        </div>
    </section>
    <div className='px-28'><InfoGrid/></div>
    <div className='px-28'><TestimonialCarousel/></div>
    <div className='px-28'><Timeline/></div>
    </div>
  );
}
