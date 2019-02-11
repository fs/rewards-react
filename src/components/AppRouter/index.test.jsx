import React from 'react';
import createRouterContext from 'react-router-test-context';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';


describe('Router test', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('should show LoginForm', () => {
    // Arrange
    const AppRouter = require('./index').default;
    // Act
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>,
    );

    // Assert
    expect(wrapper.find('form')).toHaveLength(1);
  });

  test('should redirect after logged in', (done) => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    const mockAuth = jest.fn(() => new Promise((resolve) => {
      resolve(expectedToken);
    }));
    jest.mock('../../services/authService', () => mockAuth);
    const AppRouter = require('./index').default;

    const expectedEmail = 'leyla.khamidullina@flatstack.com';
    const expectedPassword = '123456';
    const context = createRouterContext();
    const wrapper = mount(<AppRouter />, { context });
    const inputEmail = wrapper.find('input#email');
    inputEmail.simulate('change', { target: { value: expectedEmail, name: 'email' } });
    const inputPassword = wrapper.find('input#password');
    inputPassword.simulate('change', { target: { value: expectedPassword, name: 'password' } });

    // Act
    wrapper.find('form').simulate('submit');

    // Assert
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(Bonuses)).toHaveLength(1);
      done();
    }, 0);
  });
});
