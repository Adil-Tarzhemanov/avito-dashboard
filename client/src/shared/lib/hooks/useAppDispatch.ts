import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'app/reducers/store.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
