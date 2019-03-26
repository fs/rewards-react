import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import authService from '../../../services/AuthService';
import bonusService from '../../../services/BonusService';

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
  const [bonusText, setBonusText] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setBonusText(event.target.value);
    setHasError(false);
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { onSuccess } = props;
    const token = authService.getToken();
    try {
      await bonusService.createBonus(token, bonusText);
      onSuccess();
    } catch (error) {
      const parsedErrorMessage = JSON.parse(error.response.request.response).errors[0].detail;
      setHasError(true);
      setErrorMessage(parsedErrorMessage);
    }
  };

  return (
    <Form onSubmit={handleSubmit} data-test="test-form">
      <Textarea
        name="bonustext"
        onChange={handleChange}
        placeholder="+100 @person add description for #create_awesomness"
        data-testid="test-textarea"
      />
      {hasError && <div className="error-message">{errorMessage}</div>}
      <Button text="Give" data-testid="test-button" />
    </Form>
  );
};

export default SendBonusForm;
