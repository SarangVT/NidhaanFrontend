"use client"

import { useRouter } from "next/navigation";

export default function AddAddress() {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="mb-8"></div>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Add a new address</h1>
        <div className="space-y-3">
          <input placeholder="Full Name" className="w-full border p-2 rounded" />
          <input placeholder="Mobile Number" className="w-full border p-2 rounded" />
          <input placeholder="Pincode" className="w-full border p-2 rounded" />
          <input placeholder="Flat, House no., etc." className="w-full border p-2 rounded" />
          <input placeholder="Area, Street, Village" className="w-full border p-2 rounded" />
          <input placeholder="Landmark" className="w-full border p-2 rounded" />
          <div className="flex gap-2">
            <input placeholder="City" className="w-full border p-2 rounded" />
            <select className="w-full border p-2 rounded">
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
            <input type="checkbox" /> Make this my default address
          </label>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => router.push('/a/addresses')}>
            Add address
          </button>
        </div>
      </div>
    </div>
  );
}
