'use client';

import { Suspense, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { createDataQuery, useDataQuery } from '@react-hookbox/data-query';

export default function Page() {
  const [id, setId] = useState('1');
  const [appliedId, setAppliedId] = useState(id);

  return (
    <div className="flex flex-col gap-8">
      <AllTodosExample />

      <Separator />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Query single todo with ID</h2>

        <div className="flex max-w-[768px] gap-4">
          <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="Todo ID" />
          <Button onClick={() => setAppliedId(id)}>Apply</Button>
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="text-lg">
            1. Create your <span className="italic font-semibold">dataQuery</span>
          </h5>
          <CodeBlock
            fileName="QueryExample.tsx"
            code={`const singleTodoDataQuery = createDataQuery<Todo, { todoId: string }>({
    queryFn: async (variables) => {
      return fetch(\`https://jsonplaceholder.typicode.com/todos/\${variables.todoId}\`).then((res) =>
        res.json(),
      );
    },
    queryKey: (variables) => ['single-todo', variables],
});`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="text-lg">
            2. Use <span className="italic font-semibold">singleTodoDataQuery</span> to query single
            data
          </h5>
          <CodeBlock
            fileName="QueryExample.tsx"
            code={`const [singleTodo, otherOptions] = useDataQuery(singleTodoDataQuery, {
    todoId: id,
});`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="text-lg">3. The result</h5>
          <Suspense
            fallback={
              <div>
                <Skeleton className="h-5 w-20 mb-2" />
                <Skeleton className="h-5 w-60 mb-2" />
                <Skeleton className="h-5 w-60" />
              </div>
            }
          >
            <SingleTodoExample todoId={appliedId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function AllTodosExample() {
  const allTodosDataQuery = createDataQuery<Todo[]>({
    queryFn: async () => {
      return await fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5').then(
        (res) => res.json(),
      );
    },
    queryKey: () => ['all-todos'],
  });

  const [allTodos] = useDataQuery(allTodosDataQuery);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Query all todos</h2>
      <div className="flex flex-col gap-2">
        <h5 className="text-lg">
          1. Create your <span className="italic font-semibold">dataQuery</span>
        </h5>
        <CodeBlock
          fileName="QueryExample.tsx"
          code={`const allTodosDataQuery = createDataQuery({
    queryFn: async () => {
      return await fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5').then((res) => res.json());
    },
    queryKey: () => ['all-todos'],
});`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-lg">
          2. Use <span className="italic font-semibold">allTodosDataQuery</span> to query data
        </h5>
        <CodeBlock
          fileName="QueryExample.tsx"
          code={`const [allTodos, otherOptions] = useDataQuery(allTodosDataQuery)`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h5 className="text-lg">3. The result</h5>
        {allTodos.map((todo) => (
          <div key={todo.id}>
            <p className="font-normal text-sm">
              <span className="mr-2 font-semibold">ID:</span>
              {todo.id}
            </p>

            <p className="font-normal text-sm">
              <span className="mr-2 font-semibold">Title:</span>
              {todo.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SingleTodoExample({ todoId }: { todoId: string }) {
  const singleTodoDataQuery = createDataQuery<Todo, { todoId: string }>({
    queryFn: async (variables) => {
      return fetch(`https://jsonplaceholder.typicode.com/todos/${variables.todoId}`).then((res) =>
        res.json(),
      );
    },
    queryKey: (variables) => ['single-todo', variables],
  });

  const [singleTodo] = useDataQuery(singleTodoDataQuery, {
    todoId: todoId,
  });

  return (
    <div>
      <p className="font-normal text-sm">
        <span className="mr-2 font-semibold">ID:</span>
        {singleTodo.id}
      </p>

      <p className="font-normal text-sm">
        <span className="mr-2 font-semibold">Title:</span>
        {singleTodo.title}
      </p>

      <p className="font-normal text-sm">
        <span className="mr-2 font-semibold">Completed:</span>
        {String(singleTodo.completed)}
      </p>
    </div>
  );
}
