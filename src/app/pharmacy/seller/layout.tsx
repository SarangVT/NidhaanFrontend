import { SellerContextProvider } from "@/app/lib/contexts/SellerContext";
import React from "react";

export default function PharmacySellerLayout({children, }: Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            <SellerContextProvider>{children}</SellerContextProvider>
        </div>
    );
}
