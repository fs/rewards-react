import React, { Component } from 'react';
import { Redirect } from 'react-router';
import LoginForm from '../LoginForm';

export default class LoginRouter extends Component {
  state = { loggedIn: false };

  constructor(...args) {
    super(...args);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    this.setState({ loggedIn: true });
  }

  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return (<Redirect to="/bonuses" />);
    }

    return (<LoginForm onLogin={this.onLogin} />);
  }
}
