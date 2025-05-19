import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  BaseDataMutationContext,
  DataMutation,
  DataMutationOptions,
  UseDataMutationResult,
} from './typings/data-mutation.typings';
import { joinOptions } from './utils/join-options';
import { transformMutationResult } from './utils/transform-mutation-result';

export function useDataMutation<
  TData = unknown,
  TVariables = void,
  TError = DefaultError,
  TContext extends BaseDataMutationContext = BaseDataMutationContext,
>(
  mutation: DataMutation<TData, TVariables, TError, TContext>,
  options: Omit<DataMutationOptions<TData, TVariables, TError, TContext>, 'mutationFn'> = {},
): UseDataMutationResult<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient();

  const joinedOptions = joinOptions(mutation, options, {
    asyncMethods: ['onMutate', 'onSuccess', 'onError', 'onSettled'],
    priorities: [mutation.callbackPriorities, options.callbackPriorities],
  });

  const result = useMutation<TData, TError, TVariables, TContext>({
    ...joinedOptions,
    onMutate: async (variables): Promise<TContext> =>
      ({
        ...(await joinedOptions.onMutate?.(variables)),
        queryClient,
      }) as TContext,
    mutationFn: mutation.mutationFn,
  });

  return transformMutationResult(result);
}
