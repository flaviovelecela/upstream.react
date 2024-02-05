import React from 'react';
import { Amplify } from 'aws-amplify';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Home from './home';
import Login from './Login';
import AuthenticatorPrompt from './Lockedout';

Amplify.configure(awsExports);

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/Lockedout" element={<AuthenticatorPrompt/>} />
        </Routes>
      </Router>
  );
}