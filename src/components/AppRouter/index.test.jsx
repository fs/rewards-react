import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {
  render, wait,
} from 'react-testing-library';

import { MemoryRouter } from 'react-router';
import AppRouter from './index';

describe('Router test', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('should show LoginForm', () => {
    // Arrange
    const expectedInitialEntries = ['/'];
    // Act
    const { getByTestId } = render(
      <MemoryRouter initialEntries={expectedInitialEntries}>
        <AppRouter />
      </MemoryRouter>,
    );

    const form = getByTestId('test-login-form');
    // Assert
    expect(form).toBeInTheDocument();
  });

  test('should redirect after logged in', async () => {
    // Arrange
    const expectedInitialEntries = ['/bonuses'];
    // Act
    const { getByTestId } = render(
      <MemoryRouter initialEntries={expectedInitialEntries}>
        <AppRouter />
      </MemoryRouter>,
    );
    const form = getByTestId('test-form');
    // Assert
    await wait(() => {
      expect(form).toBeInTheDocument();
    });
  });
});
