import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then(res => res.data.data),
  });
};
