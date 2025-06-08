import { Button, type ButtonProps } from '@mui/material';
import { useTaskForm } from 'shared/lib/TaskFormContext';
import { matchPath, useLocation } from 'react-router-dom';

type Props = ButtonProps & {
  label?: string;
};

export const CreateTaskButton = ({
  variant = 'outlined',
  color = 'inherit',
  label = 'Создать задачу',
  ...rest
}: Props) => {
  const openForm = useTaskForm();
  const location = useLocation();
  const match = matchPath('/boards/:boardId/*', location.pathname);
  const boardId = match?.params?.boardId;

  const isBoardPage = Boolean(boardId);

  const handleCreate = async () => {
    await openForm({
      mode: 'create',
      origin: 'tasks',
      initialValues: isBoardPage ? { boardId: Number(boardId) } : {},
    });
  };

  return (
    <Button variant={variant} color={color} onClick={handleCreate} {...rest}>
      {label}
    </Button>
  );
};
