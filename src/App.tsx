import { Route, Routes } from 'react-router-dom';
import { AuthOptions } from './constants';
import Home from './features/Home';
import Auth from './features/Auth';
import Transactions from './features/Transactions';
import Private from './features/Private';
import Budgets from './features/Budgets';
import Reports from './features/Reports';
import Settings from './features/Settings';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/auth'>
        <Route path='signIn' element={<Auth mode={AuthOptions.SIGN_IN} />} />
        <Route path='signUp' element={<Auth mode={AuthOptions.SIGN_UP} />} />
      </Route>
      <Route path='/dashboard' element={<Private/>}>
        <Route index path='transactions' element={<Transactions />} />
        <Route path='budgets' element={<Budgets />} />
        <Route path='reports' element={<Reports />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
