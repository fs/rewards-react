import React from 'react';
import { mount } from 'enzyme';

describe('LoginForm test', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should call authenticate onSubmit LoginForm', async (done) => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    const mockAuth = jest.fn(() => new Promise((resolve) => {
      resolve(expectedToken);
    }));
    jest.mock('../../services/authService', () => mockAuth);
    const LoginForm = require('./index').default;

    const expectedEmail = 'leyla.khamidullina@flatstack.com';
    const expectedPassword = '123456';

    const wrapper = mount(<LoginForm />);
    const inputEmail = wrapper.find('input#email');
    inputEmail.simulate('change', { target: { value: expectedEmail, name: 'email' } });
    const inputPassword = wrapper.find('input#password');
    inputPassword.simulate('change', { target: { value: expectedPassword, name: 'password' } });

    // Act
    wrapper.find('form').simulate('submit');

    // Assert
    setTimeout(() => {
      expect(mockAuth).toBeCalledWith(expectedEmail, expectedPassword);
      done();
    }, 0);
  });

  test('should call authenticate onSubmit LoginForm and show Error Message', async (done) => {
    // Arrange
    const expectedErrorMessage = 'Invalid credentials.';

    const expectedResponse = {
      errors: [{
        source: {
          pointer: '/data/attributes/base',
        },
        detail: expectedErrorMessage,
      }],
    };
    
    const mockAuth = jest.fn(() => new Promise((resolve, reject) => {
      reject(expectedResponse);
    }));
    jest.mock('../../services/authService', () => mockAuth);
    const LoginForm = require('./index').default;

    const expectedEmail = 'your.mom@mail.ru';
    const expectedPassword = 'daddy1900';

    const wrapper = mount(<LoginForm />);
    const inputEmail = wrapper.find('input#email');
    inputEmail.simulate('change', { target: { value: expectedEmail, name: 'email' } });
    const inputPassword = wrapper.find('input#password');
    inputPassword.simulate('change', { target: { value: expectedPassword, name: 'password' } });
    
    // Act
    wrapper.find('form').simulate('submit');
    
    // Assert
    setTimeout(() => {
      expect(mockAuth).toBeCalledWith(expectedEmail, expectedPassword);
      expect(wrapper.find('.error-message').text()).toEqual(expectedErrorMessage);
      done();
    }, 0);
  });
});
