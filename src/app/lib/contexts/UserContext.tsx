'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import { gql, useApolloClient } from '@apollo/client';
import { Address, DecodedToken, UserContextType, } from './types/UserTypes';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const GET_USER_ADDRESSES = gql`
  query GetUserAddresses($userId: Int!) {
    getUserAddresses(userId: $userId) {
      id
      name
      phone
      address
      locality
      city
      state
      pincode
      landmark
      isDefault
    }
  }
`;

export const GET_CART_COUNT = gql`
  query GetUserCartCount($userId: Int!) {
    getUserCartCount(userId: $userId)
  }
`

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [itemNumberCart, setItemNumberCart] = useState<number>(0);
  const [address, setAddress] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const client = useApolloClient();

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
    const getCartCount = async () => {
      try {
        if (userId) {
          const { data } = await client.query({
            query: GET_CART_COUNT,
            variables: {userId}
          })
          setItemNumberCart(data?.getUserCartCount);
        }
      } catch(err) {
          console.error("Failed to fetch addresses", err);
      }
    }
    getCartCount();
  }, [userId]);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        if (userId) {
          const { data }= await client
            .query({
              query: GET_USER_ADDRESSES,
              variables: { userId },
            })
            const addresses = data?.getUserAddresses;
            setAddress(addresses);
            const defaultAddress = addresses.filter((t: Address) => {return t.isDefault} );
            setSelectedAddress(defaultAddress[0]);
        }
      } catch(err) {
          console.error("Failed to fetch addresses", err);
      };
    }
    getAddresses();
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
