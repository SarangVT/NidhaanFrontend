"use client";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useUserData } from "@/app/lib/contexts/UserContext";

const CREATE_USER_ADDRESS = gql`
  mutation CreateUserAddress(
    $userId: Int!
    $name: String
    $phone: String
    $pincode: String
    $address: String
    $locality: String
    $city: String
    $state: String
    $landmark: String
    $isDefault: Boolean
  ) {
    createUserAddress(
      userId: $userId
      name: $name
      phone: $phone
      pincode: $pincode
      address: $address
      locality: $locality
      city: $city
      state: $state
      landmark: $landmark
      isDefault: $isDefault
    )
  }
`;

export default function AddAddress() {
  const router = useRouter();
  const { userId } = useUserData();

  useEffect(() => {
    if (!userId) {
      router.replace("/auth/login");
    }
  }, [userId]);

  const [createUserAddress] = useMutation(CREATE_USER_ADDRESS);

  const [form, setForm] = useState({
    userId : Number(userId),
    name: "",
    phone: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    landmark: "",
    isDefault: false,
  });
  if (!userId) return null;
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async () => {
    try {
      await createUserAddress({ variables: form });
      router.push("/a/addresses");
    } catch (error) {
      console.error("Failed to create address:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-8" />
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Add a new address</h1>
        <div className="space-y-3">
          <input name="name" placeholder="Full Name" className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="phone" placeholder="Mobile Number" className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="address" placeholder="Flat, House no., etc." className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="locality" placeholder="Area, Street, Village" className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="landmark" placeholder="Landmark" className="w-full border p-2 rounded" onChange={handleChange} />
          <div className="flex gap-2">
            <input name="city" placeholder="City" className="w-full border p-2 rounded" onChange={handleChange} />
            <select className="w-full border p-2 rounded" onChange={handleChange}>
                <option>Select State/UT</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
            </select>
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isDefault" onChange={handleChange} />
            Make this my default address
          </label>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Add address
          </button>
        </div>
      </div>
    </div>
  );
}
