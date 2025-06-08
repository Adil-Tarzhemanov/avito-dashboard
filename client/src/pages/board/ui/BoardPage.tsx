import { useLocation, useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useGetBoardTasks } from 'entities/board';
import { useTaskForm } from 'shared/lib/TaskFormContext';
import { normalizeTaskToFormValues } from 'entities/task/lib/normalizeTaskToFormValues';
import type { Task } from 'entities/task/model/types';
import { scrollWrapperSx } from 'pages/board/constants/boardPageConstants';
import type { TaskStatus } from 'pages/board/model/types.ts';
import { statuses, statusLabels } from 'widgets/TasksWidgets/constants/Constants.ts';
import { TaskColumn } from 'widgets/TasksWidgets/ui/TaskColumn.tsx';

const BoardPage = () => {
  const { boardId } = useParams();
  const location = useLocation();
  const boardName = location.state?.name;

  const { data: boardTasks = [], isLoading, isError, refetch } = useGetBoardTasks(boardId);
  const openForm = useTaskForm();

  const handleEditTask = async (task: Task) => {
    const updated = await openForm({
      mode: 'edit',
      origin: 'tasks',
      initialValues: {
        ...normalizeTaskToFormValues(task),
        boardId: Number(boardId),
      },
    });

    if (updated) {
      await refetch();
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">Ошибка при загрузке задач</Typography>
      </Box>
    );
  }

  return (
    <Box px={2} py={4}>
      <Typography variant="h4" align="center" gutterBottom>
        {boardName}
      </Typography>

      <Paper variant="outlined" sx={scrollWrapperSx}>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }} gap={2}>
          {statuses.map((status: TaskStatus, index: number) => (
            <TaskColumn
              key={status}
              title={statusLabels[status]}
              tasks={boardTasks.filter((task: Task) => task.status === status)}
              onTaskClick={handleEditTask}
              isFirst={index === 0}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default BoardPage;
