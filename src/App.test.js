import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import App from './App';

describe('App Router test', () => {
  test('should show LoginPage on main page', () => {
    // Arrange
    const history = createMemoryHistory({ initialEntries: ['/'] });

    // Act
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const loginForm = getByTestId('test-login-form');

    // Assert
    expect(loginForm).toBeInTheDocument();
  });

  test('should show BonusPage on /bonuses', () => {
    // Arrange
    const history = createMemoryHistory({ initialEntries: ['/bonuses'] });

    // Act
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const bonusForm = getByTestId('test-bonus-form');

    // Assert
    expect(bonusForm).toBeInTheDocument();
  });
});
