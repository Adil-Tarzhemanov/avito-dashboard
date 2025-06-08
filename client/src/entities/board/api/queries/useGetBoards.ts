import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi.ts';

export const useGetBoards = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: ({ signal }) => api.get('/boards', { signal }).then(res => res.data.data),
    enabled, // контролируется снаружи, поскольку params, нельзя получить здесь
    staleTime: 5 * 60 * 1000,
  });
};
