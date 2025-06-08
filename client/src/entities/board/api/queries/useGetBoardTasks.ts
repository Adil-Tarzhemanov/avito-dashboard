import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/api/axiosApi.ts';

export const useGetBoardTasks = (boardId?: string) => {
  return useQuery({
    queryKey: ['board-tasks', boardId],
    queryFn: ({ signal }) => api.get(`/boards/${boardId}`, { signal }).then(res => res.data.data),
    // enabled: !!boardId, // запрос не выполнится, пока нет boardId
    // staleTime: 5 * 60 * 1000,
  });
};
