'use client';

import { CodeBlock } from '@/components/ui/code-block';

import { createDataMutation, useDataMutation } from '@repo/data-query/client';

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <MutationExample />
    </div>
  );
}

const createTodoDataMutation = createDataMutation({
  mutationFn: async (variables: any) => {
    return fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(variables),
    });
  },
});

function MutationExample() {
  const [addTodo, { isPending, isError, error, isSuccess }] = useDataMutation(
    createTodoDataMutation,
    {
      onSuccess: () => {
        console.log('Todo added successfully');
      },
    },
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Mutations</h2>
      <div className="flex flex-col gap-2">
        <h5 className="text-lg">
          Here's an example of a mutation that adds a new todo to the server
        </h5>
        <CodeBlock
          fileName="MutationExample.tsx"
          code={`const createTodoDataMutation = createDataMutation({
  mutationFn: async (variables: any) => {
    return fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(variables),
    });
  },
});

function App() {
  const [addTodo, { isPending, isError, error, isSuccess }] = useDataMutation(
    createTodoDataMutation,
    {
      onSuccess: () => {
        console.log('Todo added successfully');
      },
    },
  );

  return (
    <div>
      {isPending ? (
        'Adding todo...'
      ) : (
        <>
          {isError ? (
            <div>An error occurred: {error.message}</div>
          ) : null}

          {isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              addTodo({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  )
}`}
        />
      </div>
    </div>
  );
}
