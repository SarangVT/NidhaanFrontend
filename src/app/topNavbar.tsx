'use client'
import { useUserData } from './lib/contexts/UserContext';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { FaCartPlus, FaPhone, FaPhoneAlt, FaPhoneSlash, FaPhoneSquare, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import AddressModal from './components/a/AddressModal';

export default function AuthNavbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { setUserName, userName, itemNumberCart,selectedAddress, setSelectedAddress, setUserId } = useUserData();
  const handleRedirect = () => {
    window.open('https://wa.me/917754858641', '_blank');
  }

  const LogOut = async () => {
    try {
        localStorage.removeItem("authToken");
        setUserName(null);
        setUserId(undefined);
        router.replace('/');
    } catch (error) {
    }
  };
  return (
    <div className="w-full flex justify-between items-center px-2 md:px-24 py-3 bg-white shadow-md z-50">
      
    <div className="flex items-center gap-2">
        <Image width={8} height={8} src="/logo.png" alt="Nidhaan Logo" className="h-8 w-8" />
        <span className="font-bold text-teal-600 text-xl">NIDHAAN</span>
        <div className="ml-4 flex items-center gap-2 cursor-pointer">
          <FaMapMarkerAlt className="text-teal-600" />
        <div onClick={() => setShowAddressModal(true)}>
            <p className="text-xs text-gray-500">Deliver to {selectedAddress?.name || 'Guest'}</p>
            <p className="text-sm font-semibold text-gray-800">{selectedAddress?.city} {selectedAddress?.pincode}</p>
        </div>
</div>
      </div>
    <div className='flex flex-row font-bold items-center text-teal-700'>
        <button className="bg-white font-bold px-4 py-2 flex items-center gap-2 relative" onClick={() => router.push('/a/cart')}>
          <FaCartPlus size={25} />
          {itemNumberCart > 0 && (
            <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs font-semibold rounded-lg h-5 w-5 flex items-center justify-center">
              {itemNumberCart}
            </span>
          )}
        </button>
        <button className="bg-white font-bold px-4 py-2 flex items-center gap-2" onClick={handleRedirect}>
            <FaPhoneAlt size={21}/>
        </button>
        {!userName && (
          <>
        <button className="bg-white font-bold px-4 py-2 flex items-center gap-2" onClick={() => router.push('/auth/signup')}>
            Signup
        </button><p> | </p>
        <button className="bg-white font-bold px-4 py-2 flex items-center gap-2" onClick={() => router.push('/auth/login')}>
        Login
        <FaUser className="text-teal-700" />
      </button>
      </>)}
      {userName && (<button className="bg-white font-bold px-4 py-2 flex items-center gap-2" onClick={LogOut}>
            Logout
        </button>)}
    </div>
    <AddressModal
      open={showAddressModal}
      setOpen={setShowAddressModal}
    />
    </div>
  )
}
