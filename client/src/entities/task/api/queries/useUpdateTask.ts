import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi';
import type { Task, UpdateTaskDto } from 'entities/task/model/types';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { id: number; data: UpdateTaskDto; signal?: AbortSignal }) => {
      const { id, data, signal } = payload;
      const response = await api.put<Task>(`/tasks/update/${id}`, data, {
        signal,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
