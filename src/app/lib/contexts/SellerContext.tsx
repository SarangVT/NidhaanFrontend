'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  sellerId: string;
}

interface Address {
  id: number;
  Seller_id: number;
  full_name: string;
  mobile_number: string;
  pincode: string;
  house_address: string;
  street_address: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  defaultAddress: boolean;
}

interface SellerContextType {
  sellerId: string | undefined,
  setSellerId: (id: string | undefined) => void;
}

const SellerContext = createContext<SellerContextType | undefined>(undefined);

export function SellerContextProvider({ children }: { children: ReactNode }) {
  const [sellerId, setSellerId] = useState<string | undefined>(undefined);

  const setSellerFromToken = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setSellerId(decoded.sellerId);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("sellerAuthToken");

    if (token && token.split(".").length === 3) {
      try {
        setSellerFromToken(token);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("sellerAuthToken"); // Clean up broken token
      }
    } else {
      localStorage.removeItem("sellerAuthToken");
    }
  }, []);

  return (
    <SellerContext.Provider
      value={{
        sellerId,
        setSellerId,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
}

export function useSellerData() {
  const context = useContext(SellerContext);
  if (!context) throw new Error('useSellerData must be used within a SellerContextProvider');

  const {
    sellerId,
    setSellerId,
  } = context;

  return {
    sellerId,
    setSellerId,
  };
}
