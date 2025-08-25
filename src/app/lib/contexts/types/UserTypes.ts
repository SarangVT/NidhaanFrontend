export interface DecodedToken {
  email: string;
  userId: string;
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
}

export interface UserContextType {
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
  selectedSpecialities: string[];
  setSelectedSpecialities: (string: string[]) => void;
}