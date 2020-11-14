import React, { useState } from 'react';

import './App.css';
import Identifier from './identifier/Identifier';
import Login from './login/Login';

const storedJwt = localStorage.getItem('token');

const App = () => {
  const [jwt, setJwt] = useState(storedJwt || null);

  return jwt ? <Identifier /> : <Login setJwt={setJwt} />;
};

export default App;
