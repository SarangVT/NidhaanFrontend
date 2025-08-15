"use client";
import { useState } from "react";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail, AiOutlineLock, AiOutlinePhone } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Link from "next/link";
import { BACKEND_URL } from "@/app/lib/utils";

const VERIFY_DOCTOR = gql`
  mutation VerifyDoctor($email: String!, $password: String!, $phone: String!) {
    verifyDoctor(email: $email, password: $password, phone: $phone) {
      token
      doctor
    }
  }
`;

export default function LoginForm() {
  const router = useRouter();
  const [verifyDoctor, { loading }] = useMutation(VERIFY_DOCTOR);

  const [form, setForm] = useState({ contact: "", password: "" });
  const [errors, setErrors] = useState({ contact: "", password: "" });
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const isEmail = (input: string) => /[a-zA-Z@.]/.test(input);
  const isPhone = (input: string) => /^[0-9]{10}$/.test(input);
  const checkEmail = (input: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);
  const checkPhone = (input: string) => /^\+?[0-9]{7,15}$/.test(input);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      const newErrors = { contact: "", password: "" };
      if (!checkEmail(form.contact) && !checkPhone(form.contact)) {
        newErrors.contact = "Enter a valid email or 10-digit phone number";
      }
      if (form.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      setErrors(newErrors);

      setTimeout(() => {
        setErrors({ contact: "", password: "" });
      }, 3000);

      if (newErrors.contact || newErrors.password) return;

      const { data } = await verifyDoctor({
        variables: {
          email: isEmail(form.contact) ? form.contact : "",
          phone: isPhone(form.contact) ? form.contact : "",
          password: form.password,
        },
      });

      const token = data.verifyDoctor.token;
      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(data.verifyDoctor.user));
        router.push("/");
      }
    } catch (err) {
      let message = "Something went wrong";
      if (err instanceof ApolloError) {
        message = err.graphQLErrors?.[0]?.message || err.message;
      }
      setPopupMessage(message);
    }
  };

  return (
    <div className="w-full p-14 pb-0">
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
            name="contact"
            placeholder="Email or Phone"
            value={form.contact}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            {isEmail(form.contact) ? <AiOutlineMail /> : <AiOutlinePhone />}
          </div>
        </div>
        {errors.contact && (
          <p className="text-red-600 text-sm font-medium mt-1">{errors.contact}</p>
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
        onClick={handleSignIn}
        disabled={loading}
        className="w-full bg-teal-600 text-white py-3 rounded-md font-bold hover:bg-teal-700 transition disabled:bg-teal-300"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div className="flex items-center justify-center gap-2 my-4">
        <div className="h-px bg-teal-500 w-full" />
        <span className="text-teal-500 text-sm">or</span>
        <div className="h-px bg-teal-500 w-full" />
      </div>

      <GoogleLogin
        type={'standard'}
        theme={'outline'}
        size={'large'}
        text={'signin_with'}
        shape={'rectangular'}
        logo_alignment={'center'}
        onSuccess={async (credentialResponse) => {
          const res = await axios.post(
            `${BACKEND_URL}/google/login/doctor`,
            {
              token: credentialResponse.credential,
            },
            { withCredentials: true }
          );
          console.log('User logged in:', res.data);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      <div className="text-center p-5 font-semibold text-teal-600">
        <Link href="/doctors/register">Don't have an account, Signup Now for free!</Link>
      </div>
    </div>
  );
}
