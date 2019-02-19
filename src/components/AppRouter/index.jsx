import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LoginRouter from '../LoginRouter';

const Index = () => <LoginRouter />;
const Bonuses = () => <h2>Bonuses</h2>;

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/bonuses" component={Bonuses} />
    </Switch>
  </Router>
);

export default AppRouter;
