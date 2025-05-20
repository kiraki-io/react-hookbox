'use client';

import { FC, HTMLAttributes } from 'react';

import { useCopyToClipboard } from 'usehooks-ts';

import { Button } from './button';

interface CodeBlockProps {
  fileName: string;
  code: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({ fileName, code }) => {
  const [value, copyFn] = useCopyToClipboard();

  return (
    <div className="rounded-lg border bg-background">
      <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
        <div className="text-sm font-medium">{fileName}</div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted/50 text-muted-foreground cursor-pointer"
          onClick={() => copyFn(code)}
        >
          {!value ? <CopyIcon className="h-4 w-4" /> : <CheckIcon className="h-4 w-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <div className="p-4 font-mono text-sm leading-6 text-foreground">
        <pre className="language-javascript">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

function CopyIcon(props: HTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon(props: HTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
