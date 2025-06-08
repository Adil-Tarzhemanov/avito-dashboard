import { Button, type ButtonProps } from '@mui/material';
import { useTaskForm } from 'shared/lib/TaskFormContext';

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

  const handleCreate = async () => {
    await openForm({
      mode: 'create',
      origin: 'tasks',
      initialValues: {},
    });
  };

  return (
    <Button variant={variant} color={color} onClick={handleCreate} {...rest}>
      {label}
    </Button>
  );
};
