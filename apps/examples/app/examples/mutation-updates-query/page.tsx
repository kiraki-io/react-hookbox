'use client';

import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import {
  createDataMutation,
  createDataQuery,
  useDataMutation,
  useDataQuery,
} from '@react-hookbox/data-query';

export default function Page() {
  return (
    <div>
      <MutationExample />
    </div>
  );
}
const updateTodoDataMutation = createDataMutation({
  mutationFn: async (variables: any) => {
    return fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'PATCH',
      body: JSON.stringify(variables),
    });
  },
  onSuccess: async (_data, _variables, { queryClient }) => {
    await queryClient.invalidateQueries({
      queryKey: ['single-todo'],
    });
  },
});

function MutationExample() {
  const singleTodoDataQuery = createDataQuery({
    queryFn: async () => {
      return fetch(`https://jsonplaceholder.typicode.com/todos/1`).then((res) => res.json());
    },
    queryKey: () => ['single-todo'],
  });

  useDataQuery(singleTodoDataQuery);

  const [updateTodo, { isPending, isSuccess, isError }] = useDataMutation(updateTodoDataMutation, {
    onSuccess: () => {
      console.log('Todo updated successfully');
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Invalidation query after mutation</h2>
      <div className="flex flex-col gap-2">
        <h5 className="text-lg">
          Here&apos;s an example of a mutation that updates todo with ID 1
        </h5>

        <div>
          <Button
            onClick={() =>
              updateTodo({
                title: 'Updated title',
              })
            }
            disabled={isPending}
          >
            Update Todo
          </Button>
          {isSuccess && <p className="mt-1 text-green-600">Todo updated successfully</p>}
          {isError && <p className="mt-1 text-red-600">Failed to update Todo</p>}
        </div>
        <CodeBlock
          fileName="MutationExample.tsx"
          code={`const updateTodoDataMutation = createDataMutation({
  mutationFn: async (variables: any) => {
    return fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'PATCH',
      body: JSON.stringify(variables),
    });
  },
  onSuccess: async (_data, _variables, { queryClient }) => {
    {* Invalidate query after success mutation with query key *}
    await queryClient.invalidateQueries({
      queryKey: ['single-todo'],
    });
  },
});

const singleTodoDataQuery = createDataQuery({
  queryFn: async () => {
    return fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) =>
      res.json(),
    );
  },
  queryKey: () => ['single-todo'],
});

function App() {
  const [singleTodo] = useDataQuery(singleTodoDataQuery);

  const [updateTodo, { isPending, isSuccess, isError }] = useDataMutation(updateTodoDataMutation, {
    onSuccess: () => {
      console.log('Todo updated successfully');
    },
  });

  return (
    <div>
      {isPending ? (
        'Updating todo...'
      ) : (
        <>
          {isError ? (
            <div>An error occurred: {error.message}</div>
          ) : null}

          {isSuccess ? <div>Todo updated!</div> : null}

          <button
            onClick={() => {
              updateTodo({ title: 'Updated title', })
            }}
          >
            Update Todo
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
