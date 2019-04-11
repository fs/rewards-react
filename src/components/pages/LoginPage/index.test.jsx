import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { Redirect as mockRedirect } from 'react-router';
import {
  render, fireEvent, wait, waitForElement,
} from 'react-testing-library';
import AuthService from '../../../services/AuthService';
import LoginPage from './index';

jest.mock('react-router', () => ({
  Redirect: jest.fn(() => null),
}));

jest.mock('../../../services/AuthService');

describe('LoginPage test', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should call authenticate onSubmit LoginPage', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    const mockAuthenticate = jest.fn(() => (
      new Promise((resolve) => {
        resolve(expectedToken);
      })
    ));
    AuthService.authenticate.mockImplementation(mockAuthenticate);

    const expectedEmail = 'leyla.khamidullina@flatstack.com';
    const expectedPassword = '123456';

    const { getByTestId } = render(<LoginPage />);
    const inputEmail = getByTestId('test-email');
    fireEvent.change(inputEmail, { target: { value: expectedEmail } });
    const inputPassword = getByTestId('test-password');
    fireEvent.change(inputPassword, { target: { value: expectedPassword } });
    const form = getByTestId('test-login-form');

    // Act
    fireEvent.submit(form);

    // Assert
    await wait(() => {
      expect(AuthService.authenticate).toBeCalledWith(expectedEmail, expectedPassword);
      expect(mockRedirect).toHaveBeenCalledTimes(1);
      expect(mockRedirect).toHaveBeenCalledWith({ to: '/bonuses' }, {});
    });
  });

  test('should call authenticate onSubmit LoginForm and show Error Message', async () => {
    // Arrange
    const expectedErrorMessage = 'Invalid credentials.';
    const expectedResponse = `{"errors":[{"source":{"pointer":"/data/attributes/base"},"detail":"${expectedErrorMessage}"}]}`;
    const expectedError = { response: { request: { response: expectedResponse } } };

    const mockAuthenticate = jest.fn(() => (
      new Promise((resolve, reject) => {
        reject(expectedError);
      })
    ));
    AuthService.authenticate.mockImplementation(mockAuthenticate);

    const expectedEmail = 'test@flatstack.com';
    const expectedPassword = '123456';

    const { getByTestId, getByText } = render(<LoginPage />);
    const inputEmail = getByTestId('test-email');
    fireEvent.change(inputEmail, { target: { value: expectedEmail } });
    const inputPassword = getByTestId('test-password');
    fireEvent.change(inputPassword, { target: { value: expectedPassword } });
    const form = getByTestId('test-login-form');

    const button = getByTestId('test-button');
    // Act
    fireEvent.submit(form);

    const errorContainer = await waitForElement(() => getByText(expectedErrorMessage));

    // Assert
    await wait(() => {
      expect(AuthService.authenticate).toBeCalledWith(expectedEmail, expectedPassword);
      expect(mockRedirect).toHaveBeenCalledTimes(0);
      expect(errorContainer).toHaveTextContent(expectedErrorMessage);
      expect(button).not.toBeDisabled();
    });
  });
});
