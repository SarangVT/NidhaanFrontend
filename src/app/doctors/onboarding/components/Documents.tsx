'use client'
import React, { useState, useEffect } from 'react'
import { gql, useMutation, useApolloClient } from '@apollo/client'

const UPLOAD_DOCUMENT = gql`
  mutation UploadDocument($document: DoctorDocumentInput!, $gstNumber: String) {
    uploadDoctorDocument(document: $document, gstNumber: $gstNumber)
  }
`

const GET_UPLOAD_URL = gql`
  query GetUploadUrl($filename: String!, $type: String!) {
    getDoctorDocUrl(filename: $filename, type: $type) {
      url
      key
    }
  }
`

export default function DocumentVerification({ currentStep, setCurrentStep }: { currentStep: number, setCurrentStep: (index: number) => void }) {
  const client = useApolloClient()
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({})
  const [uploadMessage, setUploadMessage] = useState<{ [key: string]: string }>({})
  const [uploaded, setUploaded] = useState<{ [key: string]: boolean }>({ gst: false, reg: false, degree: false })
  const [gstNumber, setGstNumber] = useState('')
  const [selectedGSTFile, setSelectedGSTFile] = useState<File | null>(null)
  const [selectedRegFile, setSelectedRegFile] = useState<File | null>(null)
  const [selectedDegreeFile, setSelectedDegreeFile] = useState<File | null>(null)

  const [uploadDocument] = useMutation(UPLOAD_DOCUMENT)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setGstNumber(e.target.value)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'gst' | 'reg' | 'degree') => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) return
    const validTypes = ['application/pdf','image/jpeg','image/jpg','image/png']
    if (!validTypes.includes(file.type)) return
    if (type === 'gst') setSelectedGSTFile(file)
    if (type === 'reg') setSelectedRegFile(file)
    if (type === 'degree') setSelectedDegreeFile(file)
    setUploadMessage(m => ({ ...m, [type]: '' }))
  }

  const handleUploadDocument = async (file: File | null, docType: 'GST_CERTIFICATE' | 'REGISTRATION_CERTIFICATE' | 'DEGREE_CERTIFICATE', key: string) => {
    if (!file) return
    setUploading(u => ({ ...u, [key]: true }))
    setUploadMessage(m => ({ ...m, [key]: '' }))
    try {
      const filename = `${Date.now()}_${file.name}`
      const { data } = await client.query({
        query: GET_UPLOAD_URL,
        variables: { filename, type: docType },
        context: { fetchOptions: { credentials: 'include' } },
        fetchPolicy: 'no-cache'
      })
      const uploadUrl = data.getDoctorDocUrl.url
      const fileKey = data.getDoctorDocUrl.key
      await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": "application/octet-stream" }, body: file })
      const payload = {
        document: { url: fileKey, type: docType },
        ...(docType === "GST_CERTIFICATE" ? { gstNumber } : {})
      }
      await uploadDocument({
        variables: payload,
        context: { fetchOptions: { credentials: "include" } },
      })
      setUploadMessage(m => ({ ...m, [key]: `${docType.replace('_', ' ')} uploaded successfully!` }))
      setUploaded(u => ({ ...u, [key]: true }))
    } catch {
      setUploadMessage(m => ({ ...m, [key]: `Error uploading ${docType.replace('_', ' ')}. Try again later.` }))
      setUploaded(u => ({ ...u, [key]: false }))
    } finally {
      setUploading(u => ({ ...u, [key]: false }))
    }
  }

  useEffect(() => {
    if (uploaded.gst && uploaded.reg && uploaded.degree) {
      setCurrentStep(currentStep + 1)
    }
  }, [uploaded, currentStep, setCurrentStep])

  const renderFileUpload = (label: string, file: File | null, onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onUpload: () => void, id: string, key: string) => (
    <div className="mt-4 space-y-2">
      <label className="block text-gray-700 font-medium">{label}</label>
      <input type="file" accept=".pdf,.jpeg,.jpg,.png" onChange={onFileChange} className="hidden" id={id}/>
      <div className="flex flex-col space-y-2">
        <label htmlFor={id} className="inline-block cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded w-max">Choose Document</label>
        {file && <p className="text-md font-semibold">{file.name}</p>}
        <button onClick={onUpload} disabled={uploading[key] || !file} className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 w-max">
          {uploading[key] ? 'Uploading...' : 'Upload'}
        </button>
        {uploadMessage[key] && <p className={`text-sm mt-1 ${uploadMessage[key].includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{uploadMessage[key]}</p>}
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-2xl p-4 space-y-6">
      <div>
        <label className="block text-gray-700 font-medium">15 digit GST Number</label>
        <input
          value={gstNumber}
          onChange={handleChange}
          placeholder="Enter GST Number"
          className="w-full mt-1 p-2 rounded border border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {renderFileUpload(
        'GST Certificate',
        selectedGSTFile,
        e => handleFileChange(e, 'gst'),
        () => handleUploadDocument(selectedGSTFile, 'GST_CERTIFICATE', 'gst'),
        'gst-file',
        'gst'
      )}

      {renderFileUpload(
        'Registration Certificate',
        selectedRegFile,
        e => handleFileChange(e, 'reg'),
        () => handleUploadDocument(selectedRegFile, 'REGISTRATION_CERTIFICATE', 'reg'),
        'reg-file',
        'reg'
      )}

      {renderFileUpload(
        'Degree Certificate',
        selectedDegreeFile,
        e => handleFileChange(e, 'degree'),
        () => handleUploadDocument(selectedDegreeFile, 'DEGREE_CERTIFICATE', 'degree'),
        'degree-file',
        'degree'
      )}
    </div>
  )
}
