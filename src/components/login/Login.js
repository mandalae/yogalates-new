import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import cognitoUtils from '../../lib/cognitoUtils';
import sessionUtils from '../../lib/session';

function Login() {
    useEffect(() => {
        cognitoUtils.parseCognitoWebResponse(window.location.href) // parse the callback URL
        .then(() => cognitoUtils.getCognitoSession()) // get a new session
        .then((session) => {
          sessionUtils.setSession(session);
          window.location = '/';
      }).catch(err => {
          console.log(err);
          window.location = cognitoUtils.getCognitoSignInUri();
      });
    }, []);

    if (sessionUtils.isLoggedIn()) {
        return <Redirect to="/" />
    }
    return <div/>
}

export default Login;
