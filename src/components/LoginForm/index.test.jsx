import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './index';
import {handleSubmit} from "./index";

describe('LoginForm test', () => {
    test('should call authenticate onSubmit LoginForm', () => {
        // Assert
        const wrapper = shallow(<LoginForm onSubmit={LoginForm.handleSubmit} />);
        const expectedValues = {
            email: 'leyla.khamidullina@flatstack.com',
            password: '123456'
        };

        // Act
        wrapper.find('Formik').props().onSubmit(expectedValuesq);

        // Arrange
        expect(wrapper.instance().handleSubmit()).toHaveBeenCalledWith(expectedValues);
    });
});
