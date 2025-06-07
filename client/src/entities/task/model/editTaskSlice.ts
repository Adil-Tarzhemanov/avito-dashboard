import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { Task } from 'entities/task/model/types';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch.ts';
import type { RootState } from 'app/reducers/storeTypes.ts';

type State = {
  currentTask: Task | null;
};

const initialState: State = {
  currentTask: null,
};

const editTaskSlice = createSlice({
  name: 'editTask',
  initialState,
  reducers: {
    setCurrentTask(state, action: PayloadAction<Task>) {
      state.currentTask = action.payload;
    },
    clearCurrentTask(state) {
      state.currentTask = null;
    },
  },
});

export const { setCurrentTask, clearCurrentTask } = editTaskSlice.actions;

export const useEditTaskActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(editTaskSlice.actions, dispatch);
};

export const useEditTaskState = () => {
  return useSelector((state: RootState) => state.editTaskSlice);
};

export default editTaskSlice.reducer;
