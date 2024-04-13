import React, { useContext, useState } from 'react';

import Button from './Button/Button';
import Input from './Input/Input';
import { baseUrl, onChange } from '../utils';
import { RegisterErrorResponse, Token } from '../types';
import TokenContext from '../context/TokensContext';

const Register = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');

  const [errors, setErrors] = useState<RegisterErrorResponse>({});
  const [submitButtonClicked, setSubmitButtonClicked] = useState<boolean>(false);
  const {setAccessToken, setRefreshToken} = useContext(TokenContext);

  const onSubmitButtonClick = () => {
    setSubmitButtonClicked(true);
    
    const registerData = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
      password2: passwordRepeat,
    });
    
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    fetch(`${baseUrl}/api/user/create/`, {
      method: 'POST',
      body: registerData,
      headers
    })
    .then(response => response.json() as Promise<RegisterErrorResponse | Token>)
    .then(json => {
      if ('access' in json) {
        setAccessToken(json.access);
        setRefreshToken(json.refresh);
      } else {
        setErrors(json);
      }
    })    
    .finally(() => setSubmitButtonClicked(false));
  }

  return (
    <div className="auth__part auth__part--right">
      <h2 className="auth__title">Register</h2>
      <div className="input-group">
        <Input
        onChange={event => onChange(event, setFirstName)}
        placeholder='First name'
        disabled={submitButtonClicked}
        title={errors.first_name?.join(' ')}
        value={firstName}/>

        <Input
        onChange={event => onChange(event, setLastName)}
        placeholder='Last name'
        disabled={submitButtonClicked}
        title={errors.last_name?.join(' ')}
        value={lastName}/>
      </div>

      <Input
      onChange={event => onChange(event, setEmail)}
      placeholder='Email'
      disabled={submitButtonClicked}
      title={errors.email?.join(' ')}
      value={email} />

      <Input
      onChange={event => onChange(event, setUsername)}
      placeholder='Username'
      disabled={submitButtonClicked}
      title={errors.username?.join(' ')}
      value={username} />

      <div className="input-group">
        <Input
        type='password'
        onChange={event => onChange(event, setPassword)}
        placeholder='Password'
        disabled={submitButtonClicked}
        title={errors.password?.join(' ')}
        value={password} />

        <Input
        type='password'
        onChange={event => onChange(event, setPasswordRepeat)}
        placeholder='Repeat Password'
        disabled={submitButtonClicked}
        title={errors.password?.join(' ')}
        value={passwordRepeat} />
      </div>

      <Button disabled={submitButtonClicked} onClick={onSubmitButtonClick}>
        Register
      </Button>
    </div>
  )
}

export default Register;