import type { RouteObject } from 'react-router-dom';
import { TasksPage } from 'pages/issues';
import { BoardsPage } from 'pages/boards';
import { BoardPage } from 'pages/board';
import { NotFoundPage } from 'pages/not-found';

enum AppRoutes {
  TASKS = 'tasks',
  BOARDS = 'boards',
  BOARD = 'board',
  NOT_FOUND = 'not_found',
}

export const RoutesPath: Record<AppRoutes, string> = {
  [AppRoutes.TASKS]: '/tasks',
  [AppRoutes.BOARDS]: '/boards',
  [AppRoutes.BOARD]: '/boards/:boardId',
  [AppRoutes.NOT_FOUND]: '/notfound',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.TASKS]: {
    path: RoutesPath.tasks,
    element: <TasksPage />,
  },
  [AppRoutes.BOARDS]: {
    path: RoutesPath.boards,
    element: <BoardsPage />,
  },
  [AppRoutes.BOARD]: {
    path: RoutesPath.board,
    element: <BoardPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutesPath.not_found,
    element: <NotFoundPage />,
  },
};
