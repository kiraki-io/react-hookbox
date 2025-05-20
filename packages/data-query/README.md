# ⚡ React HookBox

> Powerful asynchronous state management for React — built on top of @tanstack/react-query, for data fetching, caching, and mutating.

---

## ✨ Features

- 🔍 `createDataQuery` for creating query
- 🔍 `useDataQuery` for fetching and caching data
- ✏️ `createDataMutation` for creating mutation
- ✏️ `useDataMutation` for creating/updating/deleting data
- ⚛️ Hooks-based API that fits seamlessly into React

---

## 📦 Installation

```bash
npm install ....
```

```bash
yarn install ....
```

```bash
pnpm add ....
```

---

## ✨ useDataQuery — Fetching & Caching Data

```js
const dataQuery = createDataQuery({
  queryFn: async (variables) => {
    return fetch(`.../${id}`).then((res) => res.json());
  },
  queryKey: (variables) => ['data-query-key', variables],
});

const [response] = useDataQuery(dataQuery, {
  id,
});
```

---

## ✨ useDataMutation — Creating/updating/deleting data

```js
const dataMutation = createDataMutation({
    mutationFn: async (variables: any) => {
      return fetch('...', {
        method: 'POST',
        body: JSON.stringify(variables),
      });
    },
  });

  const [mutate, { isPending, isError, error, isSuccess }] = useDataMutation(
    dataMutation,
    {
      onSuccess: () => {
        console.log('Completed successfully');
      },
    },
  );
```
