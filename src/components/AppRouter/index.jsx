import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LoginRouter from '../LoginRouter';
import Bonuses from '../Bonuses';

const Index = () => <LoginRouter />;
const Dashboard = () => <Bonuses />;

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/bonuses" component={Dashboard} />
    </Switch>
  </Router>
);

export default AppRouter;
