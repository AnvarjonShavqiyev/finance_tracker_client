import { createRoot } from 'react-dom/client'
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { AUTO_HIDE_SNACKS } from './constants/common.ts';

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider 
        autoHideDuration={AUTO_HIDE_SNACKS} 
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
)
