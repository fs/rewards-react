import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
`;

const Textarea = styled.textarea`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: #000;
  border: none;
  outline: none;
  padding: 0;
  height: 3.5rem;
  margin: 0 0 0.625rem 0;
  resize: none;
  box-shadow: none;
`;

const Button = styled.button`
  background-color: #63bc36;
  color: #fff;
  border-radius: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: bold;
`;

const SendBonusForm = () => (
  <Form>
    <Textarea placeholder="+100 @person add description for #create_awesomness" />
    <Button>Give</Button>
  </Form>
);

export default SendBonusForm;
