import { DefaultError, QueryKey } from '@tanstack/react-query';

import { DataQuery, DataQueryOptions } from './typings/data-query.typings';

export const createDataQuery = <
  TQueryFnData = unknown,
  TVariables = void,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: DataQueryOptions<TQueryFnData, TVariables, TError, TData, TQueryKey>,
): DataQuery<TQueryFnData, TVariables, TError, TData, TQueryKey> => {
  return options;
};
