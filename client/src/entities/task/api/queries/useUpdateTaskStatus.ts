import { useMutation } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi.ts';

type UpdateTaskStatusArgs = { id: number; status: string };

export const useUpdateTaskStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }: UpdateTaskStatusArgs) => {
      const controller = new AbortController();
      const signal = controller.signal;

      // здесь можно сохранить controller где-нибудь, чтобы потом вызвать controller.abort()
      return api.put(`/tasks/updateStatus/${id}`, { status }, { signal });
    },
  });
};
