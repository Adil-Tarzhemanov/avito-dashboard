import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesPath } from 'app/router/routeConfig.tsx';
import { CreateTaskButton } from 'features/task/ui/CreateTask.tsx';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PROJECT MANAGER
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={RouterLink} to={RoutesPath.tasks} color="inherit">
            Все задачи
          </Button>
          <Button component={RouterLink} to={RoutesPath.boards} color="inherit">
            Все доски
          </Button>
          <CreateTaskButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
