import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import type { TaskFormParams } from 'shared/lib/TaskFormContext.tsx';
import { useGetBoards } from 'entities/board/api/queries/useGetBoards';
import { useGetUsers } from 'entities/user/api/queries/useGetUsers';
import { useCreateTask } from 'entities/task/api/queries/useCreateTask.ts';
import type { CreateTaskDto } from 'entities/task/model/types';
import type { Board } from 'entities/board/model/types';
import type { User } from 'entities/user/model/types';

const priorities: CreateTaskDto['priority'][] = ['Low', 'Medium', 'High'];

type Props = {
  params: TaskFormParams;
  onCancel: () => void;
  onSubmit: (data: CreateTaskDto) => void;
};

export const TaskModal = ({ params, onCancel, onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<CreateTaskDto>({
    defaultValues: params.initialValues as Partial<CreateTaskDto>,
  });

  const isCreate = params.mode === 'create';
  const isFromBoard = params.origin === 'board';
  const boardId = params.initialValues?.boardId;

  const { data: users = [] } = useGetUsers();
  const { data: boards = [] } = useGetBoards(!isFromBoard);

  const { mutateAsync: createTask, isPending } = useCreateTask();

  const handleFormSubmit = async (formData: CreateTaskDto) => {
    try {
      if (isCreate) {
        await createTask(formData);
      }
      onSubmit(formData);
    } catch (e) {
      console.error('Ошибка при создании задачи:', e);
    }
  };

  return (
    <Dialog open onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{isCreate ? 'Создание задачи' : 'Редактирование задачи'}</DialogTitle>
      <DialogContent>
        <TextField
          {...register('title', { required: true })}
          label="Название"
          fullWidth
          margin="dense"
        />
        <TextField
          {...register('description')}
          label="Описание"
          fullWidth
          margin="dense"
          multiline
          rows={4}
        />
        {!isFromBoard && (
          <TextField
            {...register('boardId', { valueAsNumber: true })}
            label="Проект"
            fullWidth
            margin="dense"
            select
          >
            {boards.map((board: Board) => (
              <MenuItem key={board.id} value={board.id}>
                {board.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField {...register('priority')} label="Приоритет" fullWidth margin="dense" select>
          {priorities.map(priority => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          {...register('assigneeId', { valueAsNumber: true })}
          label="Исполнитель"
          fullWidth
          margin="dense"
          select
        >
          {users.map((user: User) => (
            <MenuItem key={user.id} value={user.id}>
              {user.fullName}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        {params.origin === 'tasks' && !isCreate && boardId && (
          <Button onClick={() => (window.location.href = `/board/${boardId}`)}>
            Перейти на доску
          </Button>
        )}
        <Button onClick={onCancel} disabled={isPending}>
          Отмена
        </Button>
        <Button variant="contained" onClick={handleSubmit(handleFormSubmit)} disabled={isPending}>
          {isCreate ? 'Создать' : 'Обновить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
