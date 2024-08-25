import { QueryKey, useQueryClient } from '@tanstack/react-query';

function useSetQueryData<T>() {
  const queryClient = useQueryClient();

  const setQueryData = (
    queryKey: QueryKey,
    updater: (prevData: T | undefined) => T,
  ): T | undefined => {
    return queryClient.setQueryData(queryKey, updater);
  };

  return setQueryData;
}
export default useSetQueryData;
