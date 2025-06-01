"use client";
import Image from 'next/image';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function AuthPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // your login logic here
  };

  const handleGoogleLogin = () => {
    // initiate Google login
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block">
        <Image
          width={673}
          height={678}
          src="/auth.png"
          alt="Authentication Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-lg rounded-2xl shadow-xl border border-green-200 p-12 space-y-12">
          <h1 className="text-3xl font-bold text-[#129990] text-center">Welcome Back</h1>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#129990] font-bold">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border-b border-b-green-300 focus:border-b-teal-600 px-2 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-teal-600 font-bold">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border-b border-b-green-300 focus:border-b-teal-600 px-2 py-2 focus:outline-none"
              />
            </div>
            <button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 my-2 rounded-lg transition-colors"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <div className="flex items-center justify-center gap-2 my-4">
              <div className="h-px bg-green-300 w-full" />
              <span className="text-green-500 text-sm">or</span>
              <div className="h-px bg-green-300 w-full" />
            </div>
            <button
              className="w-full flex items-center gap-4 shadow-lg font-bold py-3 my-8 rounded-lg transition-colors border border-teal-600 text-teal-600 hover:bg-gray-50 px-4"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="text-2xl" />
              <span className="flex-1 text-centre">Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <Image
          width={12}
          height={8}
          src="/auth.png"
          alt="Authentication Illustration"
          className="w-full h-64 object-cover mt-6"
        />
      </div>
    </div>
  );
}