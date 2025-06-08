import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: ({ signal }) => api.get('/users', { signal }).then(res => res.data.data),
  });
};
