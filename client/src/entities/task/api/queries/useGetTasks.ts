import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi.ts';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async ({ signal }) => {
      const response = await api.get('/tasks', { signal });
      return response.data.data;
    },
  });
};
