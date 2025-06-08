import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress, Stack } from '@mui/material';
import { useGetBoardTasks } from 'entities/board/api/queries/useGetBoardTasks.ts';
import type { Task } from 'entities/task/model/types.ts';

const statuses = ['Backlog', 'InProgress', 'Done'];
const statusLabels: Record<string, string> = {
  Backlog: 'To do',
  InProgress: 'In progress',
  Done: 'Done',
};

const BoardPage = () => {
  const { boardId } = useParams();
  const { data: boardTasks = [], isLoading, isError } = useGetBoardTasks(boardId);

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
        Проект #{boardId}
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
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: '2px solid #333',
                        cursor: 'pointer',
                        '&:hover': { boxShadow: 2 },
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
