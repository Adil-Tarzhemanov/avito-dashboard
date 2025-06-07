import { Card, CardContent, Typography } from '@mui/material';
import type { Task } from 'entities/task/model/types.ts';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
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
