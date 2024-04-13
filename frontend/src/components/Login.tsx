import React, { useContext, useState } from 'react';

import Button from './Button/Button';
import Input from './Input/Input';
import { baseUrl, onChange } from '../utils';
import TokenContext from '../context/TokensContext';
import { LoginErrorResponse } from '../types';


const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginButtonClicked, setLoginButtonClicked] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginErrorResponse>();

  const {setAccessToken, setRefreshToken} = useContext(TokenContext);

  const onLoginButtonClick = () => {
    if (username && password) {
      setLoginButtonClicked(true);
        
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

      fetch(`${baseUrl}/api/user/token/`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          username,
          password
        })
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if ('detail' in json) {
          setErrors(json);
          return;
        }
        setAccessToken(json.access);
        setRefreshToken(json.refresh);
      })
      .catch(alert)
      .finally(() => setLoginButtonClicked(false))
    }
  }

  return (
    <div className="auth__part auth__part--left">
      <h2 className="auth__title">Login</h2>
      <Input 
        onChange={(event) => onChange(event, setUsername)}
        placeholder='Username'
        disabled={loginButtonClicked}
        title={errors?.detail} 
        value={username} />
      
      <Input
      type="password"
      onChange={(event) => onChange(event, setPassword)}
      placeholder='Password'
      disabled={loginButtonClicked}
      title={errors?.detail}
      value={password}/>
      
      <Button
      onClick={onLoginButtonClick}
      disabled={loginButtonClicked}>
        Login
      </Button>
    </div>
  )
}

export default Login;