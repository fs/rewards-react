import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }), ...options } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>, options),
    history,
  };
}

describe('App Router test', () => {
  test('should show LoginPage on main page', () => {
    // Arrange
    const route = '/';

    // Act
    const { getByTestId } = renderWithRouter(<App />, { route });
    const loginForm = getByTestId('test-login-form');

    // Assert
    expect(loginForm).toMatchSnapshot();
  });

  test('should show BonusPage on /bonuses', () => {
    // Arrange
    const route = '/bonuses';

    // Act
    const { getByTestId } = renderWithRouter(<App />, { route });
    const bonusForm = getByTestId('test-bonus-form');

    // Assert
    expect(bonusForm).toMatchSnapshot();
  });
});
