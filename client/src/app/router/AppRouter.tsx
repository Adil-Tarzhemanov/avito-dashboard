import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'app/router/routeConfig.tsx';

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => {
          return (
            <Route key={path} path={path} element={<div className="page-wrapper">{element}</div>} />
          );
        })}
      </Routes>
    </Suspense>
  );
};
