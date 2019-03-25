import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import AuthService from '../../../services/AuthService';
import LoginTemplate from '../../templates/LoginTemplate';

const Label = styled.label`
  display: block;
  padding: 0 0 10px;
`;

const Form = styled.form`
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 40px;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  color: #000;
`;

const FormGroup = styled.div`
  margin: 0 0 15px;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  border-radius: 5px;
  font-size: 12px;
`;

const ErrorContainer = styled.div`
  margin-top: 5px;
  color: red;
  font-size: 12px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 30px;
  align-self: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  color: #fff;
  background-color: #63bc36;
  border: none;
  outline: 0;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -webkit-transition: color 0.2s, background-color 0.2s;
  transition: color 0.2s, background-color 0.2s;
`;

const LoginForm = (props) => {
  const handleSubmit = async (values, actions) => {
    try {
      await AuthService.authenticate(values.email, values.password);
      const { onLogin } = props;
      onLogin();
    } catch (error) {
      actions.setErrors({ auth: JSON.parse(error.response.request.response).errors[0].detail });
      actions.setSubmitting(false);
    }
  };

  return (
    <LoginTemplate>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Email is required'),
          password: Yup.string().required('Password is required'),
        })}
      >
        {/* eslint-disable */}
          {props => {
            const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;
            /* eslint-enable */
            return (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? 'text-input error' : 'text-input'}
                  />
                  {errors.email && touched.email && <ErrorContainer>{errors.email}</ErrorContainer>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password ? 'text-input error' : 'text-input'}
                  />
                  {errors.password && touched.password && <ErrorContainer>{errors.password}</ErrorContainer>}
                </FormGroup>

                <div className="error-message">{errors.auth}</div>

                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </Form>
            );
          }}
      </Formik>
    </LoginTemplate>
  );
};

export default LoginForm;
