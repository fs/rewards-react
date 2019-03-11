import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LoginRouter from '../LoginRouter';
import BonusesPage from '../pages/BonusesPage';

const Index = () => <LoginRouter />;
const Dashboard = () => <BonusesPage />;

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/bonuses" component={Dashboard} />
    </Switch>
  </Router>
);

export default AppRouter;
