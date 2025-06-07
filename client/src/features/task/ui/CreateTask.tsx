import { Button } from '@mui/material';
import { useTaskForm } from 'shared/lib/TaskFormContext';

type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  label?: string;
};

export const CreateTaskButton = ({
  variant = 'outlined',
  color = 'inherit',
  label = 'Создать задачу',
}: Props) => {
  const openForm = useTaskForm();

  const handleCreate = async () => {
    await openForm({
      mode: 'create',
      origin: 'tasks',
      initialValues: {},
    });
  };

  return (
    <Button variant={variant} color={color} onClick={handleCreate}>
      {label}
    </Button>
  );
};
