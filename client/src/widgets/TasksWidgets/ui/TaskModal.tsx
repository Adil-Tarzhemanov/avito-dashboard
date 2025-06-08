import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import type { TaskFormParams, TaskFormValues } from 'shared/lib/TaskFormContext';
import { useTaskFormController } from 'entities/task/model/useTaskFormController.ts';
import { TaskFormFields } from 'features/task/ui/TaskFormFields.tsx';

type Props = {
  params: TaskFormParams;
  onCancel: () => void;
  onSubmit: (data: TaskFormValues) => void;
};

export const TaskModal = ({ params, onCancel, onSubmit }: Props) => {
  const { register, handleSubmit, handleFormSubmit, users, boards, boardId, isCreate, isPending } =
    useTaskFormController(params, onSubmit);

  //добавить zod для валидации(длина текста и тд)

  return (
    <Dialog open onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{isCreate ? 'Создание задачи' : 'Редактирование задачи'}</DialogTitle>
      <DialogContent>
        <TaskFormFields
          register={register}
          params={params}
          boards={boards}
          users={users}
          isCreate={isCreate}
        />
      </DialogContent>
      <DialogActions>
        {params.origin === 'tasks' && !isCreate && boardId && (
          <Button onClick={() => (window.location.href = `/boards/${boardId}`)}>
            Перейти на доску
          </Button>
        )}
        <Button onClick={onCancel} disabled={isPending}>
          Отмена
        </Button>
        <Button variant="contained" onClick={handleSubmit(handleFormSubmit)} disabled={isPending}>
          {/*//type submit - кнопка*/}
          {isCreate ? 'Создать' : 'Обновить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
