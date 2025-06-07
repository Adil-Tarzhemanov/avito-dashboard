import type { Task } from '../model/types';
import type { TaskFormValues } from 'shared/lib/TaskFormContext';

export const normalizeTaskToFormValues = (task: Task): TaskFormValues => ({
  id: task.id, // нужен только для edit
  title: task.title,
  description: task.description,
  priority: task.priority,
  status: task.status,
  assigneeId: task.assignee.id,
  boardId: task.boardId,
});
