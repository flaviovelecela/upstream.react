import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../src/aws-exports';
import { Navigate } from "react-router-dom";

Amplify.configure(awsExports);   


const AuthenticatorPrompt = () => {
    return (
      <Authenticator>
        {({ signOut, user }) => {
          return (
            <Navigate to="/home"/>
          )
        }}
      </Authenticator>
    );
  }

export default AuthenticatorPrompt