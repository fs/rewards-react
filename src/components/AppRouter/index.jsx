import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';

const Index = () => <LoginForm />;
const Bonuses = () => <h2>Bonuses</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Index} />
      <Route path="/bonuses/" component={Bonuses} />
    </div>
  </Router>
);

export default AppRouter;
