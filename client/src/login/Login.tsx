import React, { FormEvent, useState } from 'react';

import Card from '../components/card/Card';
import Button from '../components/button/Button';
import { getEventValue } from '../common/Utils';
import { authLogin, authGithub } from '../common/ApiUtils';

const handleGithubAuth = () => {
  authGithub();
};

const emptyString = (string: string): boolean => string === '';

const Login = (props: { setJwt: Function }) => {
  const { setJwt } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputsValid = !(!emptyString(email) && !emptyString(password));

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const response = await authLogin({ email, password });
    const token = response.data;

    setJwt(token);
    localStorage.setItem('token', token);
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
              type="text"
            />
          </label>
          <label>
            <p>Password</p>
            <input
              value={password}
              onInput={(event) => setPassword(getEventValue(event))}
              type="password"
            />
          </label>
          <Button type="submit" disabled={inputsValid}>
            Login
          </Button>
        </form>
        <p>Or...</p>
        <Button onClick={handleGithubAuth}>
          Login with Github
          <img
            src={`${process.env.PUBLIC_URL}/octocat.png`}
            alt="Github Octocat"
          />
        </Button>
      </Card>
    </section>
  );
};
export default Login;
