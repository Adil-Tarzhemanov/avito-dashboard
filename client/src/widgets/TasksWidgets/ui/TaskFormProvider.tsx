import { type ReactNode, useState } from 'react';
import {
  taskFormContext,
  type TaskFormParams,
  type TaskFormValues,
} from 'shared/lib/TaskFormContext.tsx';
import { TaskModal } from './TaskModal.tsx';

export const TaskFormProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<TaskFormParams | null>(null);
  const [resolver, setResolver] = useState<(data: TaskFormValues | null) => void>();

  const openForm = (params: TaskFormParams) => {
    return new Promise<TaskFormValues | null>(resolve => {
      setTimeout(() => {
        setParams(params);
        setResolver(() => resolve);
      }, 0);
    });
  };

  const closeForm = () => {
    setParams(null);
    resolver?.(null);
    setResolver(undefined);
  };

  const submitForm = (data: TaskFormValues) => {
    setParams(null);
    resolver?.(data);
    setResolver(undefined);
  };

  return (
    <taskFormContext.Provider value={{ openForm, closeForm }}>
      {children}
      {params && <TaskModal params={params} onCancel={closeForm} onSubmit={submitForm} />}
    </taskFormContext.Provider>
  );
};
