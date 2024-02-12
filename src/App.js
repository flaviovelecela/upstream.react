import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from "react-router-dom";

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

import SiteNav from './Components/Common/SiteNav';
import SiteFooter from './Components/Common/SiteFooter';

import HomePage from './Components/Home/HomePage';
import LoginPage from './Components/Auth/LoginPage'
import RegisterPage from './Components/Auth/RegisterPage';
import ValidatePage from './Components/Auth/ValidatePage';
import Dashboard from './Components/Home/Dashboard';
import ResetPass from './Components/Auth/ResetPass';

Amplify.configure(awsExports);

function App() {
  return (
        <div>
        <SiteNav/>
        <Routes>
          <Route path='*' element={<HomePage />} />
          <Route path='/' exact={true} element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/validate' element={<ValidatePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/resetpass' element={<ResetPass />} />
        </Routes>
        <SiteFooter />
      </div>
  );
}

export default App;