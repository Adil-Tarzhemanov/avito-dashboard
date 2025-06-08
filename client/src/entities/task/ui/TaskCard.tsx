import { Avatar, Card, CardContent, Typography } from '@mui/material';
import type { Task } from 'entities/task/model/types.ts';
import { setCurrentTask } from 'entities/task/model/editTaskSlice.ts';
import { useTaskForm } from 'shared/lib/TaskFormContext.tsx';
import { normalizeTaskToFormValues } from 'entities/task/lib/normalizeTaskToFormValues.ts';
import { stringToColor } from 'shared/lib/utils/stringToColor.ts';

interface TaskCardProps {
  task: Task;
}
//render props сделать, DI
export const TaskCard = ({ task }: TaskCardProps) => {
  const openForm = useTaskForm();

  const handleClick = async () => {
    // ОБЯЗАТЕЛЬНО нужно прокинуть onClick, для переиспользования
    setCurrentTask(task);
    await openForm({
      mode: 'edit',
      origin: 'tasks',
      initialValues: normalizeTaskToFormValues(task), //переименовать normalize
    });
  };

  const bgColor = stringToColor(task.boardName);
  const initial = task.boardName.charAt(0).toUpperCase();

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
          borderColor: 'primary.main',
        },
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ position: 'relative' }}>
        {/* boardName в правом верхнем углу */}
        {task.boardName && (
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '3px 5px',
              margin: '7px',
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            <Typography>{task.boardName}</Typography>
            <Avatar sx={{ bgcolor: bgColor }}>{initial}</Avatar>
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
