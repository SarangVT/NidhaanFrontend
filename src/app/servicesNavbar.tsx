'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars } from 'react-icons/fa';

export default function ServicesNavbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <nav className="bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold p-3 text-[18px] px-6 flex items-center justify-between w-full z-50">
          <div className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars size={28} />
          </div>
          <div className="flex flex-row justify-end gap-4" />
          {menuOpen && (
            <div className="absolute top-14 left-0 w-full bg-gradient-to-r from-teal-600 to-teal-700 shadow-md opacity-90 z-10">
              <div className="flex flex-col p-4 gap-4">
                <div className="cursor-pointer" onClick={() => handleNavigate('/')}>Home</div>
                <div className="cursor-pointer" onClick={() => handleNavigate('/pharmacy')}>Medicines</div>
                <div className="cursor-pointer" onClick={() => handleNavigate('/consult-doctor')}>Consult Doctor</div>
                <div className="cursor-pointer" onClick={() => handleNavigate('/')}>Gym and Yoga</div>
                <div className="cursor-pointer" onClick={() => handleNavigate('/')}>Diagnostics</div>
                <div className="cursor-pointer" onClick={() => handleNavigate('/mental-health')}>Mental Health</div>
              </div>
            </div>
          )}
        </nav>
      ) : (
        <div className="flex flex-row gap-12 bg-teal-600 text-white font-bold p-3 text-lg justify-around pl-6 items-center w-full z-50">
          <div className="cursor-pointer" onClick={() => router.push('/')}>Home</div>
          <div className="cursor-pointer" onClick={() => router.push('/pharmacy')}>Medicines</div>
          <div className="cursor-pointer" onClick={() => router.push('/consult-doctor')}>Consult Doctor</div>
          <div className="cursor-pointer" onClick={() => router.push('/')}>Gym and Yoga</div>
          <div className="cursor-pointer" onClick={() => router.push('/')}>Diagnostics</div>
          <div className="cursor-pointer" onClick={() => router.push('/mental-health')}>Mental Health</div>
        </div>
      )}
    </>
  );
}
