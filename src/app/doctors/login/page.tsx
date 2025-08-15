import Image from 'next/image';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block">
          <Image
            width={673}
            height={678}
            src="/auth.png"
            alt="Authentication Illustration"
            className="w-full h-4/5 object-contain"
          />
        </div>
        <div className="flex justify-center bg-white p-4">
        <div className="w-full max-w-xl rounded-2xl shadow-xl border border-green-200 p-12 py-18 space-y-8 self-start">
            <h1 className="text-3xl font-bold text-[#129990] text-center">Welcome Back</h1>
            <LoginForm/>
          </div>
        </div>
        <div className="md:hidden">
          <Image
            width={600}
            height={3000}
            src="/auth.png"
            alt="Authentication Illustration"
            className="w-full h-40 object-cover mt-6"
          />
        </div>
      </div>
  );
}