"use client";
import { useUserData } from "@/app/lib/contexts/UserContext";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Address } from "../types/def";

const GET_USER_ADDRESSES = gql`
  query GetUserAddresses($userId: Int!) {
    getUserAddresses(userId: $userId) {
      id
      name
      phone
      address
      locality
      city
      state
      pincode
      landmark
      isDefault
    }
  }
`;

export default function AddressPage() {
  const router = useRouter();
  const { userId } = useUserData();

  const { data, loading, error } = useQuery(GET_USER_ADDRESSES, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: "network-only",
  });

  if (!userId) {
    router.push("/login");
    return null;
  }

  if (loading) return <div className="p-4 text-gray-500">Loading addresses...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading addresses</div>;

  const addresses: Address[] = data?.getUserAddresses || [];

  return (
    <div className="flex flex-col">
      <div className="mb-8" />
      <h1 className="text-3xl font-bold mb-12 flex justify-center">Your Addresses</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <div
            onClick={() => router.push("/a/addresses/add")}
            className="border-dashed border-2 border-gray-400 rounded flex items-center justify-center h-32 cursor-pointer hover:bg-gray-50"
          >
            + Add address
          </div>
          {addresses.map((addr) => (
            <div key={addr.id} className="border rounded p-4 relative">
              {addr.isDefault && (
                <span className="absolute top-2 right-2 text-sm text-white bg-yellow-500 px-2 py-1 rounded">
                  Default
                </span>
              )}
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm mt-1">
                {addr.address}, {addr.locality}, {addr.city}, {addr.state} {addr.pincode}
              </p>
              <p className="text-sm mt-1">Phone: {addr.phone}</p>
              <div className="flex gap-4 text-blue-600 mt-2 text-sm">
                <button>Edit</button>
                <button>Remove</button>
                {!addr.isDefault && <button>Set as Default</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
