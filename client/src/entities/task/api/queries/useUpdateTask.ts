import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi'; // адаптируй путь
import type { Task, UpdateTaskDto } from 'entities/task/model/types';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { id: number; data: UpdateTaskDto }) => {
      const { id, data } = payload;
      const response = await api.put<Task>(`/tasks/update/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
