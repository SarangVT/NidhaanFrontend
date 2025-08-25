'use client';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  ApolloProvider
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/v1/graphql',
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
