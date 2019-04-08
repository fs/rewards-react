import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import BonusesPage from './components/pages/BonusesPage';

const Index = () => <LoginPage />;
const Dashboard = () => <BonusesPage />;

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/bonuses" component={Dashboard} />
    </Switch>
  </div>
);

export default App;
