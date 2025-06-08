import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi';
import type { CreateTaskDto } from 'entities/task/model/types.ts';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const promise = api.post('/tasks/create', data, { signal });
      return promise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
