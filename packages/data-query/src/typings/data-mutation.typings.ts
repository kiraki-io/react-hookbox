import {
  DefaultError,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

export type MutationFn<TVariables = void, TData = unknown> = TVariables extends void
  ? () => Promise<TData>
  : (variables: TVariables) => Promise<TData>;

export type BaseDataMutationContext = { queryClient: QueryClient };

export type DataMutationCallbackPriorities = {
  onMutate?: number;
  onError?: number;
  onSuccess?: number;
  onSettled?: number;
};

export type DataMutationOptions<
  TData = unknown,
  TVariables = void,
  TError = DefaultError,
  TContext extends BaseDataMutationContext = BaseDataMutationContext,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'> & {
  mutationFn: MutationFn<TVariables, TData>;
  callbackPriorities?: DataMutationCallbackPriorities;
};

export type DataMutation<
  TData = unknown,
  TVariables = void,
  TError = DefaultError,
  TContext extends BaseDataMutationContext = BaseDataMutationContext,
> = DataMutationOptions<TData, TVariables, TError, TContext>;

export type UseDataMutationResultFn<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext extends BaseDataMutationContext = BaseDataMutationContext,
> = UseMutationResult<TData, TError, TVariables, TContext>['mutate'] & {
  async: UseMutationResult<TData, TError, TVariables, TContext>['mutateAsync'];
};

export type UseDataMutationResultInfo<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext extends BaseDataMutationContext = BaseDataMutationContext,
> = Omit<UseMutationResult<TData, TError, TVariables, TContext>, 'mutate' | 'mutateAsync'>;

export type UseDataMutationResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext extends BaseDataMutationContext = BaseDataMutationContext,
> = [
  UseDataMutationResultFn<TData, TError, TVariables, TContext>,
  UseDataMutationResultInfo<TData, TError, TVariables, TContext>,
];
