import { configureStore } from '@reduxjs/toolkit';
import editTaskSlice from 'entities/task/model/editTaskSlice.ts';

export const store = configureStore({
  reducer: {
    editTaskSlice,
  },
});
