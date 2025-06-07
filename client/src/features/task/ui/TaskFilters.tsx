import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { useMemo } from 'react';
import type { Task } from 'entities/task/model/types.ts';

interface Props {
  tasks: Task[];
  selectedStatus: string;
  selectedBoard: string;
  onFilterChange: (filters: { status: string; boardId: string }) => void;
}

export const TaskFilters = ({ tasks, selectedStatus, selectedBoard, onFilterChange }: Props) => {
  const statuses = useMemo(() => Array.from(new Set(tasks.map(task => task.status))), [tasks]);

  const boards = useMemo(() => {
    const map = new Map();
    tasks.forEach(task => {
      map.set(task.boardId, task.boardName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({
      id: String(id),
      name,
    }));
  }, [tasks]);

  return (
    <Box className="flex gap-[5px] flex-wrap min-w-[300px]">
      <FormControl size="small" className="w-[200px]">
        <InputLabel>Статус</InputLabel>
        <Select
          label="Статус"
          value={selectedStatus}
          onChange={e => onFilterChange({ status: e.target.value, boardId: selectedBoard })}
        >
          <MenuItem value="">Все</MenuItem>
          {statuses.map(status => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" className="w-[200px]">
        <InputLabel>Проект</InputLabel>
        <Select
          label="Проект"
          value={selectedBoard}
          onChange={e => onFilterChange({ status: selectedStatus, boardId: e.target.value })}
        >
          <MenuItem value="">Все</MenuItem>
          {boards.map(board => (
            <MenuItem key={board.id} value={board.id}>
              {board.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
