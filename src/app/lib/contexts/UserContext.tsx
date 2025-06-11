'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  email: string;
  userId: string;
}

interface Address {
  id: number;
  user_id: number;
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

interface UserContextType {
  userName: string | null;
  setUserName: (name: string | null) => void;
  userId: string | undefined;
  setUserId: (id: string | undefined) => void;
  itemNumberCart: number;
  setItemNumberCart: (count: number) => void;
  address: Address[];
  setAddress: (address: Address[]) => void;
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
  setUserFromToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [itemNumberCart, setItemNumberCart] = useState<number>(0);
  const [address, setAddress] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const setUserFromToken = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserName(decoded.email);
      setUserId(decoded.userId);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUserFromToken(token);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      setTimeout(() => {
        const fakeCartItemCount = 3;
        setItemNumberCart(fakeCartItemCount);
      }, 500);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setTimeout(() => {
        const fakeAddresses: Address[] = [
          {
            id: 1,
            user_id: Number(userId),
            full_name: 'Sarang Thakare',
            mobile_number: '9011964178',
            pincode: '444020',
            house_address: 'IIT Indore',
            street_address: 'Khandwa Road',
            landmark: 'Near IT Park',
            city: 'Indore',
            state: 'MP',
            country: 'India',
            defaultAddress: true,
          },
        ];
        setAddress(fakeAddresses);

        const defaultAddr =
          fakeAddresses.find((a) => a.defaultAddress) ?? fakeAddresses[0] ?? null;
        setSelectedAddress(defaultAddr);
      }, 500);
    }
    else {
      setSelectedAddress(null);
      setItemNumberCart(0);
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        userId,
        setUserId,
        itemNumberCart,
        setItemNumberCart,
        address,
        setAddress,
        selectedAddress,
        setSelectedAddress,
        setUserFromToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserData must be used within a UserContextProvider');

  const {
    userName,
    setUserName,
    userId,
    setUserId,
    itemNumberCart,
    setItemNumberCart,
    address,
    setAddress,
    selectedAddress,
    setSelectedAddress,
    setUserFromToken,
  } = context;

  return {
    userName,
    setUserName,
    userId,
    setUserId,
    itemNumberCart,
    setItemNumberCart,
    address,
    setAddress,
    selectedAddress,
    setSelectedAddress,
    setUserFromToken,
  };
}
