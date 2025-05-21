import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useRef } from 'react';

export function ReactQueryProvider({ children }: PropsWithChildren) {
  // Ensure a single QueryClient instance per app
  const queryClientRef = useRef<QueryClient>(new QueryClient());
  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
    </QueryClientProvider>
  );
}
