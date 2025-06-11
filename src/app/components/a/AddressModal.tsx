import { useUserData } from "@/app/lib/contexts/UserContext";
import {Address} from '../../a/addresses/page';
import { useRouter } from "next/navigation";
import Link from "next/link";

type AddressModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddressModal({ open, setOpen }: AddressModalProps) {
    const router = useRouter();
    const { address, setSelectedAddress, setAddress } = useUserData();
  if (!open) return null;

  const handleSelectAddress = async (addr: Address) => {
    try {
    //   setSelectedAddress(addr);
    //   await api.put(`/user/set-default-address`, { address_id: addr.id });

      // Refetch updated address list from backend
    //   const res = await api.get(`/user/get-address?user_id=${addr.user_id}`);
    //   const updatedAddresses = res.data.addressDetails;

    //   // Find the new default
    //   const newDefault = updatedAddresses.find(a => a.defaultAddress);
    //   setSelectedAddress({ ...newDefault }); // force new reference

    //   // Update both context values
    //   setAddress(updatedAddresses);         // very important
    //   onSelect(newDefault);                 // if needed by parent
      setOpen(false);
    } catch (error) {
      console.error('Failed to set default address', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpen(false)} />
      <div className="relative z-50 bg-white w-[90vw] max-w-md rounded shadow-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Choose your location</h2>
          <button onClick={() => setOpen(false)} className="text-2xl px-2">×</button>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          Select a delivery location to see product availability and delivery options
        </p>

        <div className="space-y-3">
        {/* Demo address for testing */}
        <div className="border p-3 rounded bg-yellow-50 border-yellow-400">
            <p className="font-semibold">Sarang Thakare</p>
            <p className="text-sm">
            Plot No 48 A, Sanjivani Nagar, Near Parmar Lawns, Amravati, Maharashtra, India - 444607
            </p>
        </div>

        {address.map((addr) => (
            <div
            key={addr.id}
            className={`border p-3 rounded cursor-pointer ${
                addr.defaultAddress ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
            }`}
            >
            <p className="font-semibold">{addr.full_name}</p>
            <p className="text-sm">
                {`${addr.house_address}, ${addr.street_address}, ${addr.landmark}, ${addr.city}, ${addr.state}, ${addr.country} - ${addr.pincode}`}
            </p>
            {addr.defaultAddress && <p className="text-xs text-gray-600">Default address</p>}
            </div>
        ))}
        </div>

        <Link href="/a/addresses">
        <div className="mt-4">
          <p
            onClick={() => {
              setOpen(false);
            }}
            className="text-blue-600 text-sm cursor-pointer hover:underline"
          >
            Manage Your Addresses
          </p>
        </div>
        </Link>
      </div>
    </div>
  );
}
