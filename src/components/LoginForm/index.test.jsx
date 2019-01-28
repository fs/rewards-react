import React from 'react';
import { mount } from 'enzyme';

describe('LoginForm test', () => {
  test('should call authenticate onSubmit LoginForm', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    const mockAuth = jest.fn(() => new Promise((resolve) => { resolve(expectedToken); }));
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
      expect(mockAuth).toBeCalledWith(expectedEmail, expectedPassword);
  });
});
