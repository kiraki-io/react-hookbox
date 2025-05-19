import {
  DefaultError,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

export type QueryFn<TVariables = unknown, TQueryFnData = unknown> = TVariables extends void
  ? () => Promise<TQueryFnData>
  : (variables: TVariables) => Promise<TQueryFnData>;

export type QueryKeyFn<
  TVariables = void,
  TQueryKey extends QueryKey = QueryKey,
> = TVariables extends void ? () => TQueryKey : (variables: TVariables) => TQueryKey;

export type DataQuery<
  TQueryFnData = unknown,
  TVariables = void,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryFn' | 'queryKey'
> & {
  queryFn: QueryFn<TVariables, TQueryFnData>;
  queryKey: QueryKeyFn<TVariables, TQueryKey>;
};

export type DataQueryOptions<
  TQueryFnData = unknown,
  TVariables = void,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = DataQuery<TQueryFnData, TVariables, TError, TData, TQueryKey>;

export type UseDataQueryResultValue<
  TData = unknown,
  TError = DefaultError,
> = UseSuspenseQueryResult<TData, TError>['data'];
export type UseDataQueryResultInfo<TData = unknown, TError = DefaultError> = Omit<
  UseSuspenseQueryResult<TData, TError>,
  'data'
>;
export type UseDataQueryResult<TData = unknown, TError = DefaultError> = [
  UseDataQueryResultValue<TData, TError>,
  UseDataQueryResultInfo<TData, TError>,
];
