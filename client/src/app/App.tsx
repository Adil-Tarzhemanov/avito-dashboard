import { Suspense } from 'react';

import { AppRouter } from 'app/router/AppRouter';
import { Header } from 'widgets/Header/Header';

export const App = () => {
  return (
    <div>
      <Suspense fallback="">
        <Header />
        <div className={'content-page'}>
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};
