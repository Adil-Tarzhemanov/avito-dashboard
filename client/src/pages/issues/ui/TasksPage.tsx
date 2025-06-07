import { useState } from 'react';
import { useGetTasks } from 'entities/task/api/queries/useGetTasks.ts';
import { PageContent } from 'shared/ui/layouts/PageContent.tsx';
import { TaskList } from 'widgets/TasksWidgets/ui/TaskList.tsx';
import { TextField } from '@mui/material';
import { TaskFilters } from 'features/task/ui/TaskFilters.tsx';
import { useFilteredTasks } from 'features/task/model/useFilteredTasks.ts';
import { useDebouncedValue } from 'shared/lib/hooks/useDebounce.ts';

const TasksPage = () => {
  const { data: tasks = [] } = useGetTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ status: '', boardId: '' });

  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const filteredTasks = useFilteredTasks(tasks, filters, debouncedSearch);

  return (
    <PageContent paddingX="px-[40px]" paddingY="pt-[20px]">
      <div className="flex justify-between items-start gap-4 pt-[20px] mb-6">
        <div className="w-1/3 shrink-0">
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Поиск по названию или исполнителю"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <TaskFilters
          tasks={tasks}
          selectedStatus={filters.status}
          selectedBoard={filters.boardId}
          onFilterChange={setFilters}
        />
      </div>
      <TaskList tasks={filteredTasks} />
    </PageContent>
  );
};

export default TasksPage;
