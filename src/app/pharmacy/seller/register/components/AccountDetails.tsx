"use client";
import { useState } from 'react';
import { gql, useMutation, ApolloError } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { AiOutlineMail, AiOutlineLock, AiOutlinePhone } from 'react-icons/ai';

const CREATE_SELLER = gql`
  mutation CreateSeller(
    $email: String!
    $password: String!
    $phone: String!
  ) {
    createSeller(
      email: $email
      password: $password
      phone: $phone
    ) {
      token
    }
  }
`;

export default function AccountDetails({currentStep, setCurrentStep}: {currentStep: number, setCurrentStep: (index: number)=> void}) {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const [createUser, { loading, error }] = useMutation(CREATE_SELLER);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const checkEmail = (input: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)
  const checkPhone = (input: string) => /^\+?[0-9]{7,15}$/.test(input)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
        const newErrors = { email: '', phone: '', password: '' };
        if (!checkEmail(form.email)) {
          newErrors.email = 'Enter a valid email';
        }
        if (!checkPhone(form.phone)) {
          newErrors.phone = 'Enter a valid 10-digit phone number';
        }
        if (form.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        setTimeout(() => {
          setErrors({
            email: '',
            phone: '',
            password: '',
          });
        }, 3000)
      if (newErrors.email || newErrors.phone || newErrors.password) return;
      const { data } = await createUser({
        variables: {
          ...form,
      },
      });
      localStorage.setItem("sellerAuthToken", data.createSeller?.token);
      setCurrentStep(currentStep+1);
    } catch (err) {
        let message = 'Something went wrong';
        if (err instanceof ApolloError) {
          message = err.graphQLErrors?.[0]?.message || err.message;
        }
        setPopupMessage(message);
      }
  };

  return (
    <div className="w-full p-6 pb-0 max-w-md">
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
        <div className="relative">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            <AiOutlineMail />
          </div>
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm font-medium mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <div className="relative">
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            <AiOutlinePhone />
          </div>
        </div>
        {errors.phone && (
          <p className="text-red-600 text-sm font-medium mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            <AiOutlineLock />
          </div>
        </div>
        {errors.password && (
          <p className="text-red-600 text-sm font-medium mt-1">{errors.password}</p>
        )}
      </div><br/><br/>

      <button
        onClick={handleSignUp}
        disabled={loading}
        className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold hover:bg-teal-700 transition disabled:bg-teal-300"
      >
        {loading ? 'Save and Continue...' : 'Save and Continue'}
      </button>
    </div>
  );

}