import { DoctorContextProvider } from "@/app/lib/contexts/DoctorContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export default function PharmacyDoctorLayout({children, }: Readonly<{children: React.ReactNode}>) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    return (
        <div>
            <GoogleOAuthProvider clientId={clientId}>
            <DoctorContextProvider>{children}</DoctorContextProvider>
            </GoogleOAuthProvider>
        </div>
    );
}
