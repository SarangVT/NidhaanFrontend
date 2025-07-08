import { DoctorContextProvider } from "@/app/lib/contexts/DoctorContext";
import React from "react";

export default function PharmacyDoctorLayout({children, }: Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            <DoctorContextProvider>{children}</DoctorContextProvider>
        </div>
    );
}
