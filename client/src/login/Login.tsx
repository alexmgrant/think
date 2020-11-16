import React, { FormEvent, useState, useEffect } from 'react';

import Card from '../components/card/Card';
import Button from '../components/button/Button';
import { getEventValue, emptyString } from '../common/Utils';
import { AUTH_GITHUB, API_URL, authLocal } from '../common/ApiUtils';

const search = window.location.search;
const params = new URLSearchParams(search);
const paramToken = params.get('token');

const Login = (props: { setJwt: Function }) => {
  const { setJwt } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputsValid = !(!emptyString(email) && !emptyString(password));
  const setToken = (token: string) => {
    setJwt(token);
    localStorage.setItem('token', token);
  };

  useEffect(() => {
    if (paramToken && !emptyString(paramToken as string))
      setToken(paramToken as string);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Only need to run this on Component render

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const response = await authLocal({ email, password });
    const token = response.data;

    setToken(token);
  };

  return (
    <section>
      <Card>
        <h4>👋 Hey! you need to login.</h4>
        <form onSubmit={handleLogin}>
          <label>
            <p>Email</p>
            <input
              value={email}
              onInput={(event) => setEmail(getEventValue(event))}
              placeholder="Any value"
              type="text"
            />
          </label>
          <label>
            <p>Password</p>
            <input
              value={password}
              onInput={(event) => setPassword(getEventValue(event))}
              placeholder="Any value"
              type="password"
            />
          </label>
          <Button type="submit" disabled={inputsValid}>
            Login
          </Button>
        </form>
        <p>Or...</p>
        <a href={`${API_URL}${AUTH_GITHUB}`}>
          <Button>
            Login with Github
            <img
              src={`${process.env.PUBLIC_URL}/octocat.png`}
              alt="Github Octocat"
            />
          </Button>
        </a>
      </Card>
    </section>
  );
};
export default Login;
