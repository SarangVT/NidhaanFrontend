'use client';
import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const CREATE_SELLER_STORE = gql`
  mutation CreateSellerStore(
    $sellerId: Int!
    $storeName: String!
    $pharmacistName: String
    $pharmacistRegNo: String
    $inTime: String
    $outTime: String
    $workingDays: [String!]
    $address: String
    $pincode: String
    $city: String
    $state: String
    $latitude: Float
    $longitude: Float
    $acceptsReturns: Boolean
  ) {
    createSellerStore(
      sellerId: $sellerId
      storeName: $storeName
      pharmacistName: $pharmacistName
      pharmacistRegNo: $pharmacistRegNo
      inTime: $inTime
      outTime: $outTime
      workingDays: $workingDays
      address: $address
      pincode: $pincode
      city: $city
      state: $state
      latitude: $latitude
      longitude: $longitude
      acceptsReturns: $acceptsReturns
    )
  }
`;

export interface StoreData {
  storeName: string;
  pharmacistName: string;
  pharmacistRegNo: string;
  workingDays: string[];
  inTime: string;
  outTime: string;
  acceptsReturns: boolean;
  address: string;
  pincode: string;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
}

interface StoreDetailsProps {
  data: StoreData;
  currentStep: number;
  setCurrentStep: (index: number) => void;
  sellerId: string | undefined;
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function StoreDetails({ data, currentStep, setCurrentStep, sellerId }: StoreDetailsProps) {
  const [createSellerStore] = useMutation(CREATE_SELLER_STORE);
  const [formData, setFormData] = useState<StoreData>({
    storeName: data.storeName || '',
    pharmacistName: data.pharmacistName || '',
    pharmacistRegNo: data.pharmacistRegNo || '',
    workingDays: data.workingDays || [],
    inTime: data.inTime || '',
    outTime: data.outTime || '',
    acceptsReturns: data.acceptsReturns ?? false,
    address: data.address || '',
    pincode: data.pincode || '',
    city: data.city || '',
    state: data.state || '',
    latitude: data.latitude || null,
    longitude: data.longitude || null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleWeekdayChange = (day: string) => {
    setFormData((prev) => {
      const isSelected = prev.workingDays.includes(day);
      return {
        ...prev,
        workingDays: isSelected
          ? prev.workingDays.filter((d) => d !== day)
          : [...prev.workingDays, day],
      };
    });
  };

  const handleLiveLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      () => {
        alert('Unable to retrieve your location.');
      }
    );
  };

  const handleSave = async () => {
    if (
      !formData.storeName.trim() ||
      !formData.pharmacistName.trim() ||
      !formData.pharmacistRegNo.trim()
    ) return;

    try {
      await createSellerStore({
        variables: {
          sellerId,
          storeName: formData.storeName,
          pharmacistName: formData.pharmacistName,
          pharmacistRegNo: formData.pharmacistRegNo,
          acceptsReturns: formData.acceptsReturns,
          inTime: formData.inTime,
          outTime: formData.outTime,
          workingDays: formData.workingDays,
          address: formData.address,
          pincode: formData.pincode,
          city: formData.city,
          state: formData.state,
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
      });

      setCurrentStep(currentStep + 1);
      console.log('Saved:', formData);
    } catch (error) {
      console.error('Store creation failed:', error);
    }
  };


  return (
    <div className="w-full max-w-2xl p-4 space-y-4">
      <h2 className="text-2xl font-bold">Store Details</h2>
      <p className="text-gray-600">Enter the details for your medical store</p>

      <div>
        <label className="text-gray-700 font-medium flex items-center space-x-1">
          <span>Store Name</span>
          <AiOutlineQuestionCircle className="text-gray-500" title="Enter the official name of your store" />
        </label>
        <input
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          placeholder="Enter Store Name"
          className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Pharmacist Name</label>
        <input
          name="pharmacistName"
          value={formData.pharmacistName}
          onChange={handleChange}
          placeholder="Enter Pharmacist Name"
          className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Pharmacist Registration Number</label>
        <input
          name="pharmacistRegNo"
          value={formData.pharmacistRegNo}
          onChange={handleChange}
          placeholder="Enter Registration Number"
          className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Working Days</label>
        <div className="flex flex-wrap mt-2">
          {weekdays.map((day) => (
            <label key={day} className="mr-3 flex items-center space-x-1 text-gray-700">
              <input
                type="checkbox"
                checked={formData.workingDays.includes(day)}
                onChange={() => handleWeekdayChange(day)}
              />
              <span>{day.slice(0, 3)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-4 mt-2">
        <div>
          <label className="block text-gray-700 font-medium">Opening Time</label>
          <input
            name="inTime"
            value={formData.inTime}
            onChange={handleChange}
            type="time"
            className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Closing Time</label>
          <input
            name="outTime"
            value={formData.outTime}
            onChange={handleChange}
            type="time"
            className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>
        <div>
          <label className="block text-gray-700 font-medium">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">City</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter City"
            className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-gray-700 font-medium">State</label>
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter State"
            className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Pincode</label>
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter Pincode"
            className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-gray-700 font-medium">Exact Location</label>
          <button
            onClick={handleLiveLocation}
            className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 text-sm"
          >
            Use Current Location
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="latitude"
            value={formData.latitude ?? ''}
            onChange={handleChange}
            placeholder="Latitude"
            type="number"
            className="p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
          <input
            name="longitude"
            value={formData.longitude ?? ''}
            onChange={handleChange}
            placeholder="Longitude"
            type="number"
            className="p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <input
          id="acceptsReturns"
          name="acceptsReturns"
          type="checkbox"
          checked={formData.acceptsReturns}
          onChange={handleChange}
        />
        <label htmlFor="acceptsReturns" className="text-gray-700">Accepts Returns</label>
      </div>

      <button
        onClick={handleSave}
        disabled={!formData.storeName.trim() || !formData.pharmacistName.trim() || !formData.pharmacistRegNo.trim()}
        className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded disabled:opacity-50"
      >
        Save Store Details
      </button>
    </div>
  );
}
