"use client";
import { useState } from "react";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { AiOutlineMail, AiOutlineLock, AiOutlinePhone } from "react-icons/ai";
import { BACKEND_URL } from "@/app/lib/utils";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useDoctorData } from "@/app/lib/contexts/DoctorContext";

const CREATE_DOCTOR = gql`
  mutation CreateDoctor(
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
  ) {
    createDoctor(
      name: $name
      email: $email
      password: $password
      phone: $phone
    ) {
      id
      email
      registrationComplete
    }
  }
`;

export default function DoctorSignUpForm() {
  const router = useRouter();
  const { setDoctorId } = useDoctorData();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [createDoctor, { loading }] = useMutation(CREATE_DOCTOR);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const checkEmail = (input: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);
  const checkPhone = (input: string) => /^\+?[0-9]{7,15}$/.test(input);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const newErrors = { name: "", email: "", phone: "", password: "" };
      if(form.name=="") newErrors.name = "Enter your name";
      if (!checkEmail(form.email)) {
        newErrors.email = "Enter a valid email";
      }
      if (!checkPhone(form.phone)) {
        newErrors.phone = "Enter a valid phone number";
      }
      if (form.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      setErrors(newErrors);

      setTimeout(() => {
        setErrors({ name: "", email: "", phone: "", password: "" });
      }, 3000);

      if (newErrors.name || newErrors.email || newErrors.phone || newErrors.password) return;

      const { data } = await createDoctor({
        variables: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        },
        context: {
          fetchOptions: {
            credentials: "include",
          },
        },
      });
      setDoctorId(data.createDoctor.id);
      router.push("/doctors/onboarding");
    } catch (err) {
      let message = "Something went wrong";
      if (err instanceof ApolloError) {
        message = err.graphQLErrors?.[0]?.message || err.message;
      }
      setPopupMessage(message);
    }
  };

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

      <div className="mb-4">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition"
        />
        {errors.name && (
        <p className="text-red-600 text-sm font-medium">
          {errors.name}
        </p>
      )}
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
          <p className="text-red-600 text-sm font-medium">
            {errors.email}
          </p>
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
          <p className="text-red-600 text-sm font-medium">
            {errors.phone}
          </p>
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
          <p className="text-red-600 text-sm font-medium">
            {errors.password}
          </p>
        )}
      </div>

      <button
        onClick={handleSignUp}
        disabled={loading}
        className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold hover:bg-teal-700 transition disabled:bg-teal-300"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <div className="flex items-center justify-center gap-2 my-4">
        <div className="h-px bg-green-300 w-full" />
        <span className="text-green-500 text-sm">or</span>
        <div className="h-px bg-green-300 w-full" />
      </div>

      <GoogleLogin
        type={"standard"}
        theme={"outline"}
        size={"large"}
        text={"signin_with"}
        shape={"rectangular"}
        logo_alignment={"center"}
        onSuccess={async (credentialResponse) => {
          const res = await axios.post(
            `${BACKEND_URL}/google/login/doctor`,
            {
              token: credentialResponse.credential,
            },
            { withCredentials: true }
          );
          if(!res.data.registrationComplete) {
            setDoctorId(res.data.id);
            router.push('/doctors/onboarding');
          }
          else {
            setDoctorId(res.data.id)
            router.push('/doctors/dashboard');
          }
        }}
        onError={() => {
          console.log("Google Login Failed");
        }}
      />
    </div>
  );
}