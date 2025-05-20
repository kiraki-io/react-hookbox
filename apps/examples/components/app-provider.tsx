'use client';

import { FC, PropsWithChildren, Suspense, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            throwOnError: true,
            staleTime: 1000 * 60 * 60 * 5,
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>{children}</Suspense>
    </QueryClientProvider>
  );
};
