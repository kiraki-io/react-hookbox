import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="mb-4 text-2xl font-semibold">1. In your terminal</h3>
        <CodeBlock fileName="terminal" code={`(npm | pnpm | yarn) install ....`} />
      </div>

      <div>
        <h3 className="mb-4 text-2xl font-semibold">
          2. Wrap your application with{' '}
          <span className="italic font-normal">QueryClientProvider</span>
        </h3>
        <CodeBlock
          fileName="App.tsx"
          code={`const App: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () => new QueryClient(),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>{children}</Suspense>
    </QueryClientProvider>
  );
};`}
        />
      </div>

      <div className="flex flex-col items-start mt-6">
        <h4>More with examples:</h4>
        <div className="flex flex-col gap-1">
          <Button asChild variant="link" className="justify-start">
            <Link href="/examples/query">1) Query</Link>
          </Button>
          <Button asChild variant="link" className="justify-start">
            <Link href="/examples/query">2) Mutation</Link>
          </Button>
          <Button asChild variant="link" className="justify-start">
            <Link href="/examples/query">3) Mutation updates Query</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
