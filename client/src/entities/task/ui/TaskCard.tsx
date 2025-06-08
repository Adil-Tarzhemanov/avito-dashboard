import { Avatar, Card, CardContent, Typography } from '@mui/material';
import type { Task } from 'entities/task/model/types';
import { setCurrentTask } from 'entities/task/model/editTaskSlice';
import { useTaskForm } from 'shared/lib/TaskFormContext';
import { normalizeTaskToFormValues } from 'entities/task/lib/normalizeTaskToFormValues';
import { stringToColor } from 'shared/lib/utils/stringToColor';
import { boardLabelStyles, cardStyles } from 'entities/task/constants/taskCardContsants.ts';

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

  const bgColor = stringToColor(task.boardName);
  const initial = task.boardName.charAt(0).toUpperCase();

  return (
    <Card variant="outlined" sx={cardStyles} onClick={handleClick}>
      <CardContent sx={{ position: 'relative', pb: '16px !important' }}>
        {task.boardName && (
          <Typography variant="caption" sx={boardLabelStyles}>
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
