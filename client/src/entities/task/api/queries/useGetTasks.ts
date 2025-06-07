import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi.ts';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/tasks');
      return response.data.data;
    },
  });
};
