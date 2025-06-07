import { useMemo } from 'react';
import type { Task } from 'entities/task/model/types.ts';

interface Filters {
  status: string;
  boardId: string;
}

export function useFilteredTasks(tasks: Task[], filters: Filters, searchQuery: string) {
  return useMemo(() => {
    const query = searchQuery.toLowerCase();

    return tasks.filter((task: Task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.assignee.fullName.toLowerCase().includes(query);

      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesBoard = !filters.boardId || String(task.boardId) === filters.boardId;

      return matchesSearch && matchesStatus && matchesBoard;
    });
  }, [tasks, searchQuery, filters]);
}
