import { Suspense } from 'react';

import { AppRouter } from 'app/router/AppRouter';
import { Header } from 'widgets/Header/Header';

export const App = () => {
  return (
    <Suspense fallback="">
      <Header />
      <AppRouter />
    </Suspense>
  );
};
