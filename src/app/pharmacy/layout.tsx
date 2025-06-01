import React from "react";


export default function PharmacyLayout({children, }: Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            {children}
        </div>
    );
}
