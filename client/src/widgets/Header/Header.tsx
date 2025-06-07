import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTaskForm } from 'shared/lib/TaskFormContext';
import { RoutesPath } from 'app/router/routeConfig.tsx';

export const Header = () => {
  const navigate = useNavigate();
  const openForm = useTaskForm();

  const handleCreate = async () => {
    await openForm({
      mode: 'create',
      origin: 'tasks',
      initialValues: {},
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PROJECT MANAGER
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate(RoutesPath.tasks)}>
            Все задачи
          </Button>
          <Button color="inherit" onClick={() => navigate(RoutesPath.boards)}>
            Все доски
          </Button>
          <Button color="inherit" variant="outlined" onClick={handleCreate}>
            Создать задачу
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
