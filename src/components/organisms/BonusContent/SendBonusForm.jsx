import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';

const Form = styled.form`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 0 20px;
  padding: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: #000;
  border: none;
  outline: none;
  padding: 0;
  height: 3.5rem;
  margin: 0 0 20px;
  resize: none;
  box-shadow: none;
`;

const SendBonusForm = (props) => {
  const {
    submit,
    change,
    hasError,
    errorMessage,
  } = props;

  return (
    <Form onSubmit={submit}>
      <Textarea
        name="bonustext"
        onChange={change}
        placeholder="+100 @person add description for #create_awesomness"
      />
      {hasError && <div className="error-message">{errorMessage}</div>}
      <Button text="Give" />
    </Form>
  );
};

export default SendBonusForm;
