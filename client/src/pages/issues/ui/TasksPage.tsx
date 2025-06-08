import { useGetTasks } from 'entities/task/api/queries/useGetTasks.ts';
import { PageContent } from 'shared/ui/layouts/PageContent.tsx';
import { TaskList } from 'widgets/TasksWidgets/ui/TaskList.tsx';
import { TextField } from '@mui/material';
import { TaskFilters } from 'features/task/ui/TaskFilters.tsx';
import { useFilteredTasks } from 'features/task/model/useFilteredTasks.ts';
import { useDebouncedValue } from 'shared/lib/hooks/useDebounce.ts';
import { CreateTaskButton } from 'features/task/ui/CreateTask.tsx';
import {
  useTaskFiltersActions,
  useTaskFiltersState,
} from 'entities/task/model/taskFiltersSlice.ts';

const TasksPage = () => {
  const { data: tasks = [] } = useGetTasks();
  const { search, status, boardId } = useTaskFiltersState();
  const { setSearch, setFilters } = useTaskFiltersActions();

  const debouncedSearch = useDebouncedValue(search, 300);
  const filteredTasks = useFilteredTasks(tasks, { status, boardId }, debouncedSearch);

  return (
    <>
      <PageContent className="px-[40px] pt-[20px]">
        <div className="flex justify-between items-start gap-4 pt-[20px] mb-6">
          <search className="w-1/3 shrink-0">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Поиск по названию или исполнителю"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </search>
          <TaskFilters
            tasks={tasks}
            selectedStatus={status}
            selectedBoard={boardId}
            onFilterChange={setFilters}
          />
        </div>
        <TaskList tasks={filteredTasks} />
        {/*//TODO сделать renderProps, который возвр JSX(в пропсах прокидывать функцию которая рендерит карточку*/}
      </PageContent>

      {/* Фиксированная кнопка */}
      {/*//TODO пришлось реализовать через инлайн стили, пока не разобрался почему tailwind не сработал*/}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 50,
        }}
      >
        <CreateTaskButton variant="contained" color="secondary" />
      </div>
    </>
  );
};

export default TasksPage;
