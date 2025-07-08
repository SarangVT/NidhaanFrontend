"use client";
import { useState } from 'react';
import { gql, useMutation, ApolloError } from '@apollo/client';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { AiOutlineMail, AiOutlineLock, AiOutlinePhone } from 'react-icons/ai';

const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phone: $phone
    ) {
      token
      user {
        id
        firstName
        lastName
        email
        phone
      }
    }
  }
`;

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER);
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
      console.log(form)
      const { data } = await createUser({
        variables: {
          ...form,
        },
      });

    const token = data.createUser.token;

    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(data.createUser.user));
    }
    window.location.href="/";
    
    } catch (err) {
        let message = 'Something went wrong';
        if (err instanceof ApolloError) {
          message = err.graphQLErrors?.[0]?.message || err.message;
        }
        setPopupMessage(message);
      }
  };

  const handleGoogleSignUp = async () => {
    try {

    } catch(err) {

    }
  }

  return (
    <div className="w-full p-6 pb-0">
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

      <div className="flex w-full gap-4 mb-4">
        <div className="w-1/2">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
          />
        </div>
        <div className="w-1/2">
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
          />
        </div>
      </div>

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
      </div>

      <button
        onClick={handleSignUp}
        disabled={loading}
        className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold hover:bg-teal-700 transition disabled:bg-teal-300"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>

      <div className="flex items-center justify-center gap-2 my-4">
        <div className="h-px bg-green-300 w-full" />
        <span className="text-green-500 text-sm">or</span>
        <div className="h-px bg-green-300 w-full" />
      </div>
      <button
        className="w-full flex items-center gap-4 shadow-lg font-bold py-3 mt-8 rounded-lg transition-colors border border-teal-600 text-teal-600 hover:bg-gray-50 px-4"
        onClick={handleGoogleSignUp}
      >
        <FcGoogle className="text-2xl" />
        <span className="flex-1 text-centre">Continue with Google</span>
      </button>
    </div>
  );

}