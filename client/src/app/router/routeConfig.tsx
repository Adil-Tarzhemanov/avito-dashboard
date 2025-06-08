import { Navigate, type RouteObject } from 'react-router-dom';
import { TasksPage } from 'pages/issues';
import { BoardsPage } from 'pages/boards';
import { BoardPage } from 'pages/board';
import { NotFoundPage } from 'pages/not-found';

enum AppRoutes {
  ISSUES = 'issues',
  BOARDS = 'boards',
  BOARD = 'board',
  NOT_FOUND = 'not_found',
}

export const RoutesPath: Record<AppRoutes, string> = {
  [AppRoutes.ISSUES]: '/issues',
  [AppRoutes.BOARDS]: '/boards',
  [AppRoutes.BOARD]: '/boards/:boardId',
  [AppRoutes.NOT_FOUND]: '/notfound',
};

export const routeConfig: Record<AppRoutes | 'root', RouteObject> = {
  root: {
    path: '/',
    element: <Navigate to="issues" replace />,
  },
  [AppRoutes.ISSUES]: {
    path: RoutesPath.issues,
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
