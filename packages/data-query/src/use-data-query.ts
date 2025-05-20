import { DefaultError, QueryKey, useSuspenseQuery } from '@tanstack/react-query';

import { DataQuery, DataQueryOptions, UseDataQueryResult } from './typings/data-query.typings';

export function useDataQuery<
  TQueryFnData = unknown,
  TVariables = void,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  query: DataQuery<TQueryFnData, TVariables, TError, TData, TQueryKey>,
  variables?: TVariables,
  options?: Omit<DataQueryOptions<TQueryFnData, TVariables, TError, TData, TQueryKey>, 'queryKey'>,
): UseDataQueryResult<TData, TError>;

export function useDataQuery<
  TQueryFnData = unknown,
  TVariables = void,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  query: DataQuery<TQueryFnData, TVariables, TError, TData, TQueryKey>,
  variables: TVariables,
  options?: Omit<DataQueryOptions<TQueryFnData, TVariables, TError, TData, TQueryKey>, 'queryKey'>,
): UseDataQueryResult<TData, TError>;

export function useDataQuery<
  TQueryFnData = unknown,
  TVariables = void,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  query: DataQuery<TQueryFnData, TVariables, TError, TData, TQueryKey>,
  variables: TVariables,
  options: Omit<
    DataQueryOptions<TQueryFnData, TVariables, TError, TData, TQueryKey>,
    'queryFn' | 'queryKey'
  > = {},
): UseDataQueryResult<TData, TError> {
  const { data, ...rest } = useSuspenseQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...query,
    ...options,
    queryFn: () => query.queryFn(variables),
    queryKey: query.queryKey(variables),
  });

  return [data, rest];
}
