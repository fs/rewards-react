import React, { useState } from 'react';
import { Redirect } from 'react-router';
import LoginPage from '../pages/LoginPage';

const LoginRouter = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const onLogin = () => {
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (<Redirect to="/bonuses" />);
  }

  return (<LoginPage onLogin={onLogin} />);
};

export default LoginRouter;
