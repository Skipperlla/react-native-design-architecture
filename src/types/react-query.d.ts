import type {
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
} from '@tanstack/react-query';

type QueryOptions<T> = UndefinedInitialDataOptions<T, Error, T, QueryKey>;
type MutationOptions<T, V> = UseMutationOptions<T, Error, V>;
