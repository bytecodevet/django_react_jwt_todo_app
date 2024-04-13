import React from 'react';

import BigSwitch from '../AuthSwitch/AuthSwitch';
import Login from '../Login';
import Register from '../Register';
import './Auth.css';

const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
      <BigSwitch />
    </div>
  )
}

export default Auth;