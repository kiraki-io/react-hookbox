'use client';

import { Suspense, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Page() {
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
      <Suspense>
        <Example />
      </Suspense>
    </QueryClientProvider>
  );
}

function Example() {
  // const { isPending, error, data } = useQuery({
  //   queryKey: ['query-key'],
  //   queryFn: () => fetch('...').then((res) => res.json()),
  // });

  // if (isPending) return 'Loading...';

  // if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      {/* <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong> */}
    </div>
  );
}
