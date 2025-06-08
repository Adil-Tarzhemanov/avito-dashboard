import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/index.css';
import './app/styles/reset.css';
import { App } from './app/App.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from 'app/providers/AppProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Provider } from 'react-redux';
// import { store } from 'app/reducers/store.ts';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<Provider store={store}>*/}
    <QueryClientProvider client={new QueryClient()}>
      <AppProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
    {/*</Provider>*/}
  </StrictMode>
);
