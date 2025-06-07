import { createStrictContext, useStrictContext } from 'shared/lib/React';

export type TaskFormMode = 'create' | 'edit';

export type TaskFormParams = {
  mode: 'create' | 'edit';
  initialValues?: Partial<TaskFormValues>;
  origin?: 'board' | 'tasks'; // чтобы определить поведение поля "Проект"
};

export type TaskFormValues = {
  title: string;
  description: string;
  boardId: string;
  priority: string;
  status: string;
  assigneeId: string;
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
