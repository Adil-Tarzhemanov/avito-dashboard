import { useForm } from 'react-hook-form';
import { useGetBoards } from 'entities/board/api/queries/useGetBoards';
import { useGetUsers } from 'entities/user/api/queries/useGetUsers';
import { useCreateTask } from 'entities/task/api/queries/useCreateTask';
import { useUpdateTask } from 'entities/task/api/queries/useUpdateTask';
import type { TaskFormParams, TaskFormValues } from 'shared/lib/TaskFormContext';

export const useTaskFormController = (
  params: TaskFormParams,
  onSubmit: (data: TaskFormValues) => void
) => {
  const { initialValues, origin, mode } = params;

  const isCreate = mode === 'create';
  const isFromBoard = origin === 'board';
  const boardId = initialValues?.boardId;

  const { register, handleSubmit } = useForm<TaskFormValues>({
    defaultValues: initialValues,
  });

  const { data: users = [] } = useGetUsers();
  const { data: boards = [] } = useGetBoards(!isFromBoard);

  const { mutateAsync: createTask, isPending: isCreating } = useCreateTask();
  const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTask();

  const handleFormSubmit = async (formData: TaskFormValues) => {
    try {
      if (isCreate) {
        const { status: _omitStatus, ...createDto } = formData;
        await createTask(createDto);
      } else {
        const { boardId: _omitBoardId, id: _omitId, ...updateDto } = formData;
        const taskId = Number(params.initialValues?.id);
        if (!taskId) throw new Error('ID задачи не передан');
        await updateTask({
          id: taskId,
          data: updateDto,
        });
      }

      onSubmit(formData);
    } catch (error) {
      console.error('Ошибка при сохранении задачи:', error);
    }
  };

  return {
    register,
    handleSubmit,
    handleFormSubmit,
    users,
    boards,
    boardId,
    isCreate,
    isFromBoard,
    isPending: isCreate ? isCreating : isUpdating,
  };
};
