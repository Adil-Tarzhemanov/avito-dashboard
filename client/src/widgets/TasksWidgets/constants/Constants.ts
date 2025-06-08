import { type ConfirmModalParams } from 'widgets/TasksWidgets/model/types.ts';

export const defaultConfirmationParams: ConfirmModalParams = {
  title: 'Подтвердите действие',
  description: 'Вы уверены что хотите продолжить?',
  closeText: 'Отмена',
  confirmText: 'Подтвердить',
  onClose: () => {},
  onConfirm: () => {},
};

export const statuses = ['Backlog', 'InProgress', 'Done'] as const;

export const statusLabels: Record<(typeof statuses)[number], string> = {
  Backlog: 'Backlog',
  InProgress: 'In progress',
  Done: 'Done',
};
