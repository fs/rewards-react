import React, { Component } from 'react';
import { Redirect } from 'react-router';
import LoginForm from '../pages/LoginPage';

export default class LoginRouter extends Component {
  state = { loggedIn: false };

  onLogin = () => {
    this.setState({ loggedIn: true });
  };

  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return (<Redirect to="/bonuses" />);
    }

    return (<LoginForm onLogin={this.onLogin} />);
  }
}
