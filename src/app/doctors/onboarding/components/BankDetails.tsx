"use client";

import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function BankDetails({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (index: number) => void;
}) {
  const [form, setForm] = useState({
    accountHolderName: "",
    bankAccountNumber: "",
    reEnterBankAccountNumber: "",
    bankIFSCCode: "",
  });
  const [errors, setErrors] = useState({
    accountHolderName: "",
    bankAccountNumber: "",
    reEnterBankAccountNumber: "",
    bankIFSCCode: "",
  });
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async () => {
    const newErrors = {
      accountHolderName: form.accountHolderName.trim() ? "" : "Enter account holder name",
      bankAccountNumber: form.bankAccountNumber.trim() ? "" : "Enter bank account number",
      reEnterBankAccountNumber:
        form.reEnterBankAccountNumber.trim() && form.reEnterBankAccountNumber === form.bankAccountNumber
          ? ""
          : "Account numbers do not match",
      bankIFSCCode: ifscRegex.test(form.bankIFSCCode.trim())
        ? ""
        : "Enter a valid IFSC code (e.g., ABCD0123456)",
    };
    setErrors(newErrors);

    if (
      newErrors.accountHolderName ||
      newErrors.bankAccountNumber ||
      newErrors.reEnterBankAccountNumber ||
      newErrors.bankIFSCCode
    ) {
      return;
    }

    try {
      console.log("Submitting:", form);
      // Perform your actual bank details submission here
    } catch (error) {
      setPopupMessage("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="w-full p-6 max-w-md">
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm">
            <p className="text-red-600 font-bold mb-4">{popupMessage}</p>
            <button
              onClick={() => setPopupMessage(null)}
              className="w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="text-gray-700 font-semibold flex items-center space-x-1 mb-2">
          <span>Account Holder Name</span>
          <AiOutlineQuestionCircle
            className="font-bold"
            title="Help: Enter the official name of your store"
          />
        </label>
        <input
          name="accountHolderName"
          placeholder="Account Holder Name"
          value={form.accountHolderName}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        {errors.accountHolderName && (
          <p className="text-red-600 text-sm mt-1">{errors.accountHolderName}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="text-gray-700 font-semibold flex items-center space-x-1 mb-2">
          <span>Account Holder Name</span>
          <AiOutlineQuestionCircle
            className="font-bold"
            title="Help: Enter the name who is using this account."
          />
        </label>
        <input
          name="bankAccountNumber"
          placeholder="Bank Account Number"
          value={form.bankAccountNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        {errors.bankAccountNumber && (
          <p className="text-red-600 text-sm mt-1">{errors.bankAccountNumber}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="text-gray-700 font-semibold">Re-Enter Bank Account Number</label>
        <input
          name="reEnterBankAccountNumber"
          placeholder="Re-Enter Bank Account Number"
          value={form.reEnterBankAccountNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        {errors.reEnterBankAccountNumber && (
          <p className="text-red-600 text-sm mt-1">{errors.reEnterBankAccountNumber}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="text-gray-700 font-semibold flex items-center space-x-1 mb-2">
          <span>IFSC Code</span>
          <AiOutlineQuestionCircle
            className="font-bold"
            title="Help: It is used to identify branch and bank, e.g SBIN0002712"
          />
        </label>
        <input
          name="bankIFSCCode"
          placeholder="Bank IFSC Code"
          value={form.bankIFSCCode}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        {errors.bankIFSCCode && (
          <p className="text-red-600 text-sm mt-1">{errors.bankIFSCCode}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-teal-600 text-white py-3 rounded font-semibold hover:bg-teal-700"
      >
        Save Bank Details
      </button>
    </div>
  );
}