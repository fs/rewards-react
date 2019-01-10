import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

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
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
  color: #000;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px 8px;
  margin: 0 0 15px;
`;

const Button = styled.button`
  color: #fff;
  background-color: #63bc36;
  border-radius: 100px;
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  padding: 13px 30px;
  -webkit-transition: color 0.2s, background-color 0.2s;
  transition: color 0.2s, background-color 0.2s;
  border: none;
  outline: 0;
  box-shadow: none;
`;

const LoginForm = () => (
  <div>
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Required'),
        password: Yup.string().required('Password is required'),
      })}
    >
      {/* eslint-disable */}
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        /* eslint-enable */
        return (
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email" style={{ display: 'block' }}>
                Email
            </Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                  errors.email && touched.email ? 'text-input error' : 'text-input'
                }
            />
            {errors.email
              && touched.email && <div className="input-feedback">{errors.email}</div>}
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? 'text-input error' : 'text-input'
              }
            />
            {errors.password
            && touched.password && <div className="input-feedback">{errors.password}</div>}
            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
                Reset
            </button>
            <Button type="submit" disabled={isSubmitting}>
                Submit
            </Button>


          </Form>
        );
      }}
    </Formik>

  </div>
);
export default LoginForm;
