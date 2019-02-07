import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import LoginForm from '../LoginForm';
import Bonuses from '../Bonuses';
import AppRouter from '.';

describe('Router test', () => {
  test('should show LoginForm', () => {
    // Arrange
    // Act
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    // Assert
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  test('should redirect after logged in', (done) => {
    // Arrange
    const expectedEmail = 'leyla.khamidullina@flatstack.com';
    const expectedPassword = '123456';
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
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
