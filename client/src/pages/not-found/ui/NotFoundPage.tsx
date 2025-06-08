import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <Typography variant="h2" className="text-6xl font-bold text-blue-600 mb-4">
        404
      </Typography>
      <Typography variant="h5" className="text-2xl text-gray-700 mb-6">
        Страница не найдена
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        className="text-base px-6 py-2"
      >
        На главную
      </Button>
    </div>
  );
};

export default NotFoundPage;
