import { configureStore } from '@reduxjs/toolkit';
import editTaskSlice from 'entities/task/model/editTaskSlice.ts';
import taskFiltersSlice from 'entities/task/model/taskFiltersSlice';

export const store = configureStore({
  reducer: {
    editTaskSlice,
    taskFiltersSlice,
  },
});
