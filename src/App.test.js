import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, wait } from '@testing-library/react';
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
  test('should show LoginPage on main page', async () => {
    // Arrange
    const route = '/';

    // Act
    let loginForm;

    await wait(() => {
      const { getByTestId } = renderWithRouter(<App />, { route });
      loginForm = getByTestId('test-login-form');
    });

    // Assert
    expect(loginForm).toMatchSnapshot();
  });

  test('should show BonusPage on /bonuses', async () => {
    // Arrange
    const route = '/bonuses';

    // Act
    let bonusForm;

    await wait(() => {
      const { getByTestId } = renderWithRouter(<App />, { route });
      bonusForm = getByTestId('test-bonus-form');
    });

    // Assert
    expect(bonusForm).toMatchSnapshot();
  });
});
