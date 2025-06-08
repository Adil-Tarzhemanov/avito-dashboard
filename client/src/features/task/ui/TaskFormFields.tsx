import { TextField, MenuItem } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';
import type { TaskFormParams, TaskFormValues } from 'shared/lib/TaskFormContext.tsx';
import type { CreateTaskDto } from 'entities/task/model/types.ts';
import type { Board } from 'entities/board/model/types.ts';
import type { User } from 'entities/user/model/types.ts';
import { matchPath } from 'react-router-dom';

type Props = {
  register: UseFormRegister<TaskFormValues>;
  params: TaskFormParams;
  boards: Board[];
  users: User[];
  isCreate: boolean;
};

const priorities: CreateTaskDto['priority'][] = ['Low', 'Medium', 'High'];

export const TaskFormFields = ({ register, params, boards, users, isCreate }: Props) => {
  const match = matchPath('/boards/:boardId/*', location.pathname);
  console.log('isCreate:', isCreate);
  console.log('disabled:', !!match && isCreate);

  return (
    <>
      {/*//сделать формой и прокинуть всю логику с формой а модалку отделить(в модалку прокинуть форму)*/}
      <TextField
        {...register('title', { required: true })}
        label="Название"
        fullWidth
        margin="dense"
        defaultValue={params.initialValues?.title}
      />
      <TextField
        {...register('description')}
        label="Описание"
        fullWidth
        margin="dense"
        multiline
        rows={4}
        defaultValue={params.initialValues?.description}
      />
      <TextField
        key={`${isCreate}-boardId`}
        {...register('boardId', { valueAsNumber: true })}
        label="Проект"
        fullWidth
        margin="dense"
        select
        disabled={!!match && !isCreate}
        defaultValue={params.initialValues?.boardId}
      >
        {boards.map((board: Board) => (
          <MenuItem key={board.id} value={board.id}>
            {board.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        {...register('priority')}
        label="Приоритет"
        fullWidth
        margin="dense"
        select
        defaultValue={params.initialValues?.priority}
      >
        {priorities.map(priority => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        {...register('status')}
        label="Статус"
        fullWidth
        margin="dense"
        select
        defaultValue={params.initialValues?.status}
      >
        <MenuItem value="InProgress">In Progress</MenuItem>
        <MenuItem value="Backlog">Backlog</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </TextField>
      <TextField
        {...register('assigneeId', { valueAsNumber: true })}
        label="Исполнитель"
        fullWidth
        margin="dense"
        select
        defaultValue={params.initialValues?.assigneeId}
      >
        {users.map((user: User) => (
          <MenuItem key={user.id} value={user.id}>
            {user.fullName}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};
