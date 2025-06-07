import { Card, CardContent, Typography } from '@mui/material';
import type { Task } from 'entities/task/model/types.ts';
import { setCurrentTask } from 'entities/task/model/editTaskSlice.ts';
import { useTaskForm } from 'shared/lib/TaskFormContext.tsx';
import { normalizeTaskToFormValues } from 'entities/task/lib/normalizeTaskToFormValues.ts';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const openForm = useTaskForm();

  const handleClick = async () => {
    setCurrentTask(task);
    await openForm({
      mode: 'edit',
      origin: 'tasks',
      initialValues: normalizeTaskToFormValues(task),
    });
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }} onClick={handleClick}>
      <CardContent sx={{ position: 'relative' }}>
        {/* boardName в правом верхнем углу */}
        {task.boardName && (
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              border: '2px solid #1976d2',
              padding: '3px 5px',
              margin: '7px',
              borderRadius: '4px',
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            {task.boardName}
          </Typography>
        )}

        <Typography variant="h6" fontWeight={600}>
          {task.title}
        </Typography>

        {task.description && (
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        )}

        {task.assignee?.fullName && (
          <Typography variant="caption" display="block" mt={1}>
            Назначено: {task.assignee.fullName}
          </Typography>
        )}

        {task.status && (
          <Typography variant="caption" display="block">
            Статус: {task.status}
          </Typography>
        )}

        {task.priority && (
          <Typography variant="caption" display="block">
            Приоритет: {task.priority}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
