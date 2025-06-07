import { TaskCard } from 'entities/task/ui/TaskCard.tsx';
import type { Task } from 'entities/task/model/types.ts';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul className="pt-[20px]">
      {tasks.map((task: Task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ul>
  );
};
