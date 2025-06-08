import { CircularProgress, Typography, Box, CardContent, Avatar, Stack } from '@mui/material';
import { useGetBoards } from 'entities/board/api/queries/useGetBoards';
import { CardTitle, GridContainer, StyledCard } from 'pages/boards/ui/boardsStyles.ts';
import type { Board } from 'entities/board/model/types.ts';
import { stringToColor } from 'shared/lib/utils/stringToColor.ts';
import { Link } from 'react-router-dom';

const BoardsPage = () => {
  const { data: boards = [], isLoading, isError } = useGetBoards(true);

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
        <Typography color="error">Ошибка при загрузке досок</Typography>
      </Box>
    );
  }

  return (
    <Box px={2} py={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Все доски
      </Typography>

      <GridContainer>
        {boards.map((board: Board) => {
          const bgColor = stringToColor(board.name);
          const initial = board.name.charAt(0).toUpperCase();

          return (
            <StyledCard key={board.id} component={Link} to={`/boards/${board.id}`}>
              <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                <Avatar sx={{ bgcolor: bgColor }}>{initial}</Avatar>
                <CardTitle variant="h6">{board.name}</CardTitle>
              </Stack>

              <CardContent sx={{ pt: 1, px: 0, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mt: 'auto' }}>
                  {board.description && (
                    <Typography variant="body2" color="text.secondary">
                      {board.description}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </StyledCard>
          );
        })}
      </GridContainer>
    </Box>
  );
};

export default BoardsPage;
