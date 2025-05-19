import { DefaultError } from '@tanstack/react-query';

import {
  BaseDataMutationContext,
  DataMutation,
  DataMutationOptions,
} from './typings/data-mutation.typings';

export const createDataMutation = <
  TData = unknown,
  TVariables = void,
  TError = DefaultError,
  TContext extends BaseDataMutationContext = BaseDataMutationContext,
>(
  options: DataMutationOptions<TData, TVariables, TError, TContext>,
): DataMutation<TData, TVariables, TError, TContext> => {
  return options;
};
