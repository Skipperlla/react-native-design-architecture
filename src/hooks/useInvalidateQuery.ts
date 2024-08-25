import { QueryKey, useQueryClient } from '@tanstack/react-query';

const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  return (queryKey: QueryKey) => {
    return queryClient.invalidateQueries({ queryKey });
  };
};

export default useInvalidateQuery;
