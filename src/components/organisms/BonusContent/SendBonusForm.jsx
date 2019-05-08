import React, { useState } from 'react';
import styled from 'styled-components';
import BonusTextarea from './BonusTextarea';
import Button from '../../atoms/Button';

const Form = styled.form`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 0 20px;
  padding: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const ErrorContainer = styled.div`
  color: #f00;
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
    const { onSuccess, authService, bonusService } = props;
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
    <Form onSubmit={handleSubmit} data-testid="test-bonus-form">
      <BonusTextarea onChange={handleChange} />

      <div data-testid="test-error-container">
        {hasError
          && <ErrorContainer>{errorMessage}</ErrorContainer>
        }
      </div>
      <Button text="Give" />
    </Form>
  );
};

export default SendBonusForm;
