'use client';
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';

interface GSTDetails {
  tradeName: string;
  gstNumber: string;
  gstType: string;
  legalName: string;
  address: string;
}

type SellerDocument  = {
  sellerId: number;
  type: string,
  url: string,
}

const UPDATE_GST = gql`
  mutation UpdateGST($gstNumber: String!, $documentGST: DocumentInput!) {
    updateGST(gstNumber: $gstNumber, documentGST: $documentGST) 
  }
`;

export default function DocumentVerification({currentStep, setCurrentStep}: {currentStep: number, setCurrentStep: (index: number)=> void}) {
  const [createUser, { loading, error }] = useMutation(UPDATE_GST);
  const [fetchedDetails, setFetchedDetails] = useState<GSTDetails | null>(null);
  const [gstNumber, setGstNumber] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGstNumber(e.target.value);
  };
  
  const handleVerifyGST = async () => {
    // if (!gstNumber || gstNumber.length !== 15) {
    //   setError('Please enter a valid 15 character GST Number');
    //   return;
    // }
    try {
      const gstData: GSTDetails = {
        tradeName: 'NIDHAAN PVT LTD',
        gstNumber,
        gstType: 'Regular',
        legalName: 'XPEDICR PRIVATE LIMITED',
        address:
          'Bengaluru Urban, KARNATAKA - 560055',
      };
      setFetchedDetails(gstData);
    } catch {
    } finally {
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('File must be smaller than 1MB');
      return;
    }

    const validTypes = ['application/pdf','image/jpeg','image/jpg','image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Allowed file types: PDF, JPEG, JPG, PNG');
      return;
    }
    setSelectedFile(file);
    setUploadMessage('');
  };
  
  const handleUploadGST = async () => {
    if (!selectedFile) {
      alert('Please select a GST document first.');
      return;
    }

    setUploading(true);
    setUploadMessage('');

    try {
      const token = localStorage.getItem('sellerAuthToken');
      const decoded: any = jwtDecode(token!);
      const sellerId = decoded?.sellerId;

      const filename = `${Date.now()}_${selectedFile.name}`;
      const type = "GST_CERTIFICATE";

      const res = await fetch("http://localhost:8000/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            query GetUploadUrl($filename: String!, $type: String!, $sellerId: String!) {
              getUploadUrl(filename: $filename, type: $type, sellerId: $sellerId) {
                url
                key
              }
            }
          `,
          variables: {
            filename,
            type,
            sellerId: sellerId.toString(),
          },
        }),
      });

      const { data } = await res.json();
      console.log(data)
      const uploadUrl = data.getUploadUrl.url;
      const fileKey = data.getUploadUrl.key;

      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: selectedFile,
      });

      await createUser({
        variables: {
          gstNumber,
          documentGST: {
            url: fileKey,
            type: "GST_CERTIFICATE",
            sellerId: sellerId.toString(),
          },
        },
      });

      setUploadMessage("GST Document uploaded and linked successfully!");
      setCurrentStep(currentStep+1);
    } catch (err) {
      setUploadMessage("Error uploading GST Document. Try again later.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl p-4 space-y-4">
      <div>
        <label className="block text-gray-700 font-medium">15 digit GST Number</label>
        <input
          value={gstNumber}
          onChange={handleChange}
          placeholder="Enter GST Number"
          className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
        {error && <p className="text-red-600 mt-1 text-sm"></p>}
      </div>

      <button
        onClick={handleVerifyGST}
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify GST Number'}
      </button>

      {fetchedDetails && (
        <div className="bg-gray-100 p-4 rounded mt-4 space-y-2">
          <h2 className="font-bold text-lg">Your GST Details</h2>
          <p><strong>Trade Name:</strong> {fetchedDetails.tradeName}</p>
          <p><strong>GST Number:</strong> {fetchedDetails.gstNumber}</p>
          <p><strong>GST Type:</strong> {fetchedDetails.gstType}</p>
          <p><strong>Legal Name:</strong> {fetchedDetails.legalName}</p>
          <p><strong>Address:</strong> {fetchedDetails.address}</p>

          <div className="mt-4 space-y-2">
                <div className="space-y-2">
                <input
                    id="gst-file"
                    type="file"
                    accept=".pdf,.jpeg,.jpg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <label
                    htmlFor="gst-file"
                    className="inline-block cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Choose GST Document
                </label>
          </div>

            {selectedFile && (
              <p className="text-gray-600 text-sm">Selected File: {selectedFile.name}</p>
            )}
            <p className="text-gray-500 text-sm">
              ⚠️ Maximum file size: 1MB.<br/>Supported formats: PDF, JPEG, JPG, PNG.
            </p>
            <button
              onClick={handleUploadGST}
              disabled={uploading || !selectedFile}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload GST Document'}
            </button>
            {uploadMessage && (
              <p className={`text-sm mt-2 ${uploadMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`} >
                {uploadMessage}
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <label className="block text-gray-700 font-medium">Medical Council Registration Certificate</label>
        <input
          value={gstNumber}
          onChange={handleChange}
          placeholder="Enter Registration Number"
          className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
        {error && <p className="text-red-600 mt-1 text-sm"></p>}
      </div>
    
      <div className="p-2 rounded mt-4 space-y-2">
        <div className="mt-4 space-y-2">
              <div className="space-y-2">
              <input
                  id="gst-file"
                  type="file"
                  accept=".pdf,.jpeg,.jpg,.png"
                  onChange={handleFileChange}
                  className="hidden"
              />
              <label
                  htmlFor="gst-file"
                  className="inline-block cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
              >
                  Choose Registration Certificates
              </label>
        </div>

          {selectedFile && (
            <p className="text-gray-600 text-sm">Selected File: {selectedFile.name}</p>
          )}
          <p className="text-gray-500 text-sm">
            ⚠️ Maximum file size: 10MB.<br/>Supported formats: PDF, JPEG, JPG, PNG.
          </p>
          {uploadMessage && (
            <p className={`text-sm mt-2 ${uploadMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`} >
              {uploadMessage}
            </p>
          )}          
        </div>
      </div>
      <div className="p-2 rounded mt-4 space-y-2">
        <div className="mt-4 space-y-2">
              <div className="space-y-2">
              <input
                  id="gst-file"
                  type="file"
                  accept=".pdf,.jpeg,.jpg,.png"
                  onChange={handleFileChange}
                  className="hidden"
              />
              <label
                  htmlFor="gst-file"
                  className="inline-block cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
              >
                  Choose Degree Certificate
              </label>
        </div>

          {selectedFile && (
            <p className="text-gray-600 text-sm">Selected File: {selectedFile.name}</p>
          )}
          <p className="text-gray-500 text-sm">
            ⚠️ Maximum file size: 10MB. Upload all Certificates in a Single PDF<br/>Supported formats: PDF, JPEG, JPG, PNG.
          </p>
          {uploadMessage && (
            <p className={`text-sm mt-2 ${uploadMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`} >
              {uploadMessage}
            </p>
          )}          
        </div>
      </div>    </div>
  );
}
