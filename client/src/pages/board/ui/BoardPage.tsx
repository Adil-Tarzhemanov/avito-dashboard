import { useLocation, useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress, Stack } from '@mui/material';
import { useGetBoardTasks } from 'entities/board/api/queries/useGetBoardTasks.ts';
import type { Task } from 'entities/task/model/types.ts';
import { useTaskForm } from 'shared/lib/TaskFormContext.tsx';
import { normalizeTaskToFormValues } from 'entities/task/lib/normalizeTaskToFormValues.ts';

const statuses = ['Backlog', 'InProgress', 'Done'];
const statusLabels: Record<string, string> = {
  Backlog: 'Backlog',
  InProgress: 'In progress',
  Done: 'Done',
};

const BoardPage = () => {
  const { boardId } = useParams();
  const { data: boardTasks = [], isLoading, isError, refetch } = useGetBoardTasks(boardId);
  const location = useLocation();
  const boardName = location.state?.name;

  const openForm = useTaskForm();

  const handleEditTask = async (task: Task) => {
    const updated = await openForm({
      mode: 'edit',
      origin: 'tasks',
      initialValues: {
        ...normalizeTaskToFormValues(task),
        boardId: Number(boardId), // вставляем вручную так как нам при получении таксок борда прилетает без него
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

      <Paper variant="outlined" sx={{ p: 2, overflowX: 'auto' }}>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }} gap={2}>
          {statuses.map(status => (
            <Box
              key={status}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '60vh',
                borderLeft: status !== 'Backlog' ? '1px solid #ccc' : 'none',
                pl: status !== 'Backlog' ? 2 : 0,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}
              >
                {statusLabels[status]}
              </Typography>

              <Stack spacing={2}>
                {boardTasks
                  .filter((task: Task) => task.status === status)
                  .map((task: Task) => (
                    <Paper
                      key={task.id}
                      onClick={() => handleEditTask(task)}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: '2px solid #333',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          borderColor: 'primary.main',
                          backgroundColor: 'background.paper',
                        },
                      }}
                    >
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
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default BoardPage;
