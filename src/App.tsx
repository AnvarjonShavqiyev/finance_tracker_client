import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { AuthOptions } from './constants';
import { getRouteElement } from '@helpers/getRouteElement';
import Private from './features/Private';

const Home = lazy(() => import('./features/Home'));
const Auth = lazy(() => import('./features/Auth'));
const Transactions = lazy(() => import('./features/Transactions'));
const Budgets = lazy(() => import('./features/Budgets'));
const Reports = lazy(() => import('./features/Reports'));
const Settings = lazy(() => import('./features/Settings'));

const App = () => {
  return (
      <Routes>
        <Route path='/' element={getRouteElement(<Home />)} />
        <Route path='/auth'>
          <Route path='signIn' element={getRouteElement(<Auth mode={AuthOptions.SIGN_IN} />)} />
          <Route path='signUp' element={getRouteElement(<Auth mode={AuthOptions.SIGN_UP} />)} />
        </Route>
        <Route path='/dashboard' element={<Private />}>
          <Route index path='transactions' element={getRouteElement(<Transactions />)} />
          <Route path='budgets' element={getRouteElement(<Budgets />)} />
          <Route path='reports' element={getRouteElement(<Reports />)} />
          <Route path='settings' element={getRouteElement(<Settings />)} />
        </Route>
      </Routes>
  )
}

export default App;
