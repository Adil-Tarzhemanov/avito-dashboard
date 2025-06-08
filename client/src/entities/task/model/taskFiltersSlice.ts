import { bindActionCreators, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch.ts';
import { useSelector } from 'react-redux';
import type { RootState } from 'app/reducers/storeTypes.ts';

interface TaskFiltersState {
  search: string;
  status: string;
  boardId: string;
}

const initialState: TaskFiltersState = {
  search: '',
  status: '',
  boardId: '',
};

const taskFiltersSlice = createSlice({
  name: 'taskFilters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setBoardId(state, action: PayloadAction<string>) {
      state.boardId = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<TaskFiltersState>>) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSearch, setStatus, setBoardId, setFilters, resetFilters } =
  taskFiltersSlice.actions;

export const useTaskFiltersActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(taskFiltersSlice.actions, dispatch);
};

export const useTaskFiltersState = () => {
  return useSelector((state: RootState) => state.taskFiltersSlice);
};

export default taskFiltersSlice.reducer;
