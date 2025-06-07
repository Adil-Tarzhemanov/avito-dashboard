import { TaskFormProvider } from 'widgets/TasksWidgets';
import type { ReactNode } from 'react';

export function AppProvider({ children }: { children: ReactNode }) {
  return <TaskFormProvider>{children}</TaskFormProvider>;
}
