import { DefaultError, UseMutationResult } from '@tanstack/react-query';

import {
  BaseDataMutationContext,
  UseDataMutationResult,
  UseDataMutationResultFn,
} from '../typings/data-mutation.typings';

export const transformMutationResult = <
  TData = unknown,
  TVariables = void,
  TError = DefaultError,
  TContext extends BaseDataMutationContext = BaseDataMutationContext,
>({
  mutate,
  mutateAsync,
  ...rest
}: UseMutationResult<TData, TError, TVariables, TContext>): UseDataMutationResult<
  TData,
  TError,
  TVariables,
  TContext
> => {
  const mutationFn = mutate as UseDataMutationResultFn<TData, TError, TVariables, TContext>;
  mutationFn.async = mutateAsync;

  return [mutationFn, rest];
};
