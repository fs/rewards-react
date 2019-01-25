import React from 'react';
import { mount } from 'enzyme';

describe('LoginForm test', () => {
    test('should call authenticate onSubmit LoginForm', async () => {
        // Arrange
        const mockAuth = jest.fn();
        jest.mock('../../services/authService', () => mockAuth);
        const LoginForm = require('./index').default;

        const expectedEmail = 'leyla.khamidullina@flatstack.com';
        const expectedPassword = '123456';

        const wrapper = mount(<LoginForm />);
        const inputEmail = wrapper.find('input#email');
        inputEmail.simulate('change', { target: { value: expectedEmail, name: "email" } });
        const inputPassword = wrapper.find('input#password');
        inputPassword.simulate('change', { target: { value: expectedPassword, name: "password" } });

        // Act
        wrapper.find('button').simulate('click');

        // Assert
        expect(mockAuth).toBeCalledWith(expectedEmail, expectedPassword);
    });
});
