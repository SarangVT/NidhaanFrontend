'use client';

import { UserContextProvider } from "../lib/contexts/UserContext";
import ApolloWrapper from '../lib/ApolloWrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
    <UserContextProvider>
      {children}
    </UserContextProvider>
    </ApolloWrapper>
  );
}
