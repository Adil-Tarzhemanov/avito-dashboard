import { Box, Typography, Paper, Stack } from '@mui/material';
import type { Task } from 'entities/task/model/types';
import {
  columnBoxSx,
  statusTitleSx,
  taskCardSx,
} from 'pages/board/constants/boardPageConstants.ts';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  isFirst?: boolean;
}

export const TaskColumn = ({ title, tasks, onTaskClick, isFirst = false }: TaskColumnProps) => (
  <Box sx={columnBoxSx(isFirst)}>
    <Typography variant="h6" sx={statusTitleSx}>
      {title}
    </Typography>

    <Stack spacing={2}>
      {tasks.map(task => (
        <Paper key={task.id} onClick={() => onTaskClick(task)} sx={taskCardSx}>
          <Typography fontWeight={600}>{task.title}</Typography>
          {task.description && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              {task.description}
            </Typography>
          )}
        </Paper>
      ))}
    </Stack>
  </Box>
);
