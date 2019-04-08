import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render as rtlRender } from 'react-testing-library';
import App from './App';

function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...options
  } = {},
) {
  return {
    ...rtlRender(<Router history={history}>{ui}</Router>, options),
    history,
  };
}

describe('App Router test', () => {
  test('should show LoginPage on main page', () => {
    // Arrange
    const route = '/';

    // Act
    const { getByTestId } = render(<App />, { route });
    const loginForm = getByTestId('test-login-form');

    // Assert
    expect(loginForm).toBeInTheDocument();
  });

  test('should show BonusPage on /bonuses', () => {
    // Arrange
    const route = '/bonuses';

    // Act
    const { getByTestId } = render(<App />, { route });
    const bonusForm = getByTestId('test-bonus-form');

    // Assert
    expect(bonusForm).toBeInTheDocument();
  });
});
