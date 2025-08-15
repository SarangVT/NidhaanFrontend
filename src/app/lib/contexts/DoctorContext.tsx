'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  DoctorId: string;
}

interface Address {
  id: number;
  Doctor_id: number;
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

interface DoctorContextType {
  DoctorId: string | undefined,
  setDoctorId: (id: string | undefined) => void;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export function DoctorContextProvider({ children }: { children: ReactNode }) {
  const [DoctorId, setDoctorId] = useState<string | undefined>(undefined);

  const setDoctorFromToken = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setDoctorId(decoded.DoctorId);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("DoctorAuthToken");

    if (token && token.split(".").length === 3) {
      try {
        setDoctorFromToken(token);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("DoctorAuthToken");
      }
    } else {
      localStorage.removeItem("DoctorAuthToken");
    }
  }, []);

  return (
    <DoctorContext.Provider
      value={{
        DoctorId,
        setDoctorId,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctorData() {
  const context = useContext(DoctorContext);
  if (!context) throw new Error('useDoctorData must be used within a DoctorContextProvider');

  const {
    DoctorId,
    setDoctorId,
  } = context;

  return {
    DoctorId,
    setDoctorId,
  };
}
