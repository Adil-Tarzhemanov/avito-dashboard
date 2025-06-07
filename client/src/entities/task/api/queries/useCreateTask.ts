import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi';
import type { CreateTaskDto } from 'entities/task/model/types.ts';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => api.post('/tasks/create', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
