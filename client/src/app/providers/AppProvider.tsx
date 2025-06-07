import { TaskFormProvider } from 'widgets/TasksWidgets';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <TaskFormProvider>{children}</TaskFormProvider>;
}
