import { type ConfirmModalParams } from 'widgets/TasksWidgets/model/types.ts';

export const defaultConfirmationParams: ConfirmModalParams = {
  title: 'Подтвердите действие',
  description: 'Вы уверены что хотите продолжить?',
  closeText: 'Отмена',
  confirmText: 'Подтвердить',
  onClose: () => {},
  onConfirm: () => {},
};
