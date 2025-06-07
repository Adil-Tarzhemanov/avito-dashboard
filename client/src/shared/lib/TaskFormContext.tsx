import { createStrictContext, useStrictContext } from 'shared/lib/React';

export type TaskFormParams = {
  mode: 'create' | 'edit';
  initialValues?: Partial<TaskFormValues>;
  origin?: 'board' | 'tasks'; // чтобы определить поведение поля "Проект"
};

export type TaskFormValues = {
  id?: number;
  title: string;
  description: string;
  boardId: string | number;
  priority: string;
  status: string;
  assigneeId: string | number;
};

export type TaskFormContext = {
  openForm: (params: TaskFormParams) => Promise<TaskFormValues | null>;
  closeForm: () => void;
};

export const taskFormContext = createStrictContext<TaskFormContext>();

export const useTaskForm = () => {
  const { openForm } = useStrictContext(taskFormContext);
  return openForm;
};
