import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './index';
import { handleSubmit } from "./index";

describe('LoginForm test', () => {
    test('should call authenticate onSubmit LoginForm', () => {
        // Arrange
        const expectedEmail = 'leyla.khamidullina@flatstack.com';
        const expectedPassword = '123456';

        const wrapper = shallow(<LoginForm onSubmit={LoginForm.handleSubmit} />);
        const inputEmail = wrapper.find('#email').get(0);
        inputEmail.simulate('change', { target: { value: expectedEmail } });
        const inputPassword = wrapper.find('#password').get(0);
        inputPassword.simulate('change', { target: { value: expectedPassword } });

        const mockAuth = jest.fn();
        jest.mock('../../services/authService', () => mockAuth);
        const loginForm = require('../LoginForm/index').default;

        // Act
        wrapper.find('Button').simulate('click');

        // Assert
        expect(mockAuth).toBeCalledWith(expectedEmail, expectedPassword);
    });
});
