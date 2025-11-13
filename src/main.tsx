import { createRoot } from 'react-dom/client'
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@store/store.ts'
import { AUTO_HIDE_SNACKS } from '@constants';
import { ThemeProvider } from '@mui/material';

import App from './App.tsx'
import './index.css'
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider 
          autoHideDuration={AUTO_HIDE_SNACKS} 
          anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
)
