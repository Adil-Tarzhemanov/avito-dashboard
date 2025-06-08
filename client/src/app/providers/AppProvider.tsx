import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../reducers/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { TaskFormProvider } from 'widgets/TasksWidgets';

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

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

//TODO: добавить toaster для оповещений и переработать запросы(сделать стандартизированную функцию для обработки запрсоов, использовать toaster)

export const AppProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TaskFormProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </TaskFormProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};
