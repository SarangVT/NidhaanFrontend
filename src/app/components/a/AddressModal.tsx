"use client"
import { GET_USER_ADDRESSES, useUserData } from "@/app/lib/contexts/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Address } from "@/app/lib/contexts/types/UserTypes";
import { gql, useApolloClient } from "@apollo/client";

type AddressModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const SET_DEFAULT_ADDRESS = gql`
  mutation SetDefaultAddress($addressId: Int!) {
    setDefaultAddress(addressId: $addressId)
  }
`;

export default function AddressModal({ open, setOpen }: AddressModalProps) {
  const router = useRouter();
  const client = useApolloClient();
  const { userId, address, setSelectedAddress, setAddress } = useUserData();
  if (!open) return null;

  const handleSelectAddress = async (addr: Address) => {
    try {
      await client.mutate({
        mutation: SET_DEFAULT_ADDRESS,
        variables: { addressId: addr.id },
      });

      const { data } = await client.query({
        query: GET_USER_ADDRESSES,
        variables: { userId },
        fetchPolicy: "network-only",
      });
      const updatedAddresses = data?.getUserAddresses;
      const newDefault = updatedAddresses.find((a: Address) => a.isDefault);
      setAddress(updatedAddresses);
      setSelectedAddress(newDefault || null);
      setOpen(false);
    } catch (error) {
        console.error("Failed to set default address", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setOpen(false)}
      />
      <div className="relative z-50 bg-white w-[90vw] max-w-md rounded shadow-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Choose your location</h2>
          <button onClick={() => setOpen(false)} className="text-2xl px-2">
            ×
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          Select a delivery location to see product availability and delivery
          options
        </p>

        <div className="space-y-3">
          {address.map((addr) => (
            <div
              key={addr.id}
              className={`border p-3 rounded cursor-pointer ${
                addr.isDefault
                  ? "bg-blue-50 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleSelectAddress(addr)}
            >
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm">
                {`${addr.address}, ${addr.locality}, ${addr.landmark}, ${addr.city}, ${addr.state}, ${addr.country} - ${addr.pincode}`}
              </p>
              <p className="text-sm">{addr.phone}</p>
              {addr.isDefault && (
                <p className="text-xs text-gray-600">Default address</p>
              )}
            </div>
          ))}
        </div>

        <Link href="/a/addresses">
          <div className="mt-4">
            <p
              onClick={() => setOpen(false)}
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
