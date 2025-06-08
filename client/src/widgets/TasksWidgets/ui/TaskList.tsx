import { TaskCard } from 'entities/task/ui/TaskCard.tsx';
import type { Task } from 'entities/task/model/types.ts';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul className="pt-[20px] flex flex-col gap-[20px] pb-[20px]">
      {tasks.map((task: Task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </ul>
  );
};
