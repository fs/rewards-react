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

const SendBonusForm = props => {
  const [bonusText, setBonusText] = useState('');
  const [bonusTextareaValue, setBonusTextareaValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messagePointsIsValid, setMessagePointsIsValid] = useState(false);
  const [messageUserNameIsValid, setMessageUserNameIsValid] = useState(false);
  const [messageHashTagIsValid, setMessageHashTagIsValid] = useState(false);
  const [bonusButtonText, setBonusButtonText] = useState('Give');

  const validatePoints = points => points.match(/\+[1-9]\d*/);
  const validateUserName = userNames => userNames.match(/@\w+/);
  // const validateHashTag = hashTags => hashTags.match(/#\w+/);
  const validate = (values, regex) => {
    const res = values.find(value => value.match(regex));
    return !!res;
  };
  const updateBonusButton = text => {
    if (validatePoints(text) && validateUserName(text)) {
      console.log(validatePoints(text));
    }
  };

  const handleChange = event => {
    console.log('Handling');
    const { value } = event.target;
    const values = value.split(' ');
    console.log(values);
    setBonusText(value);
    setHasError(false);
    setErrorMessage('');
    setBonusTextareaValue(event.target.value);
    setMessagePointsIsValid(validate(values, /\+[1-9]\d*$/));
    setMessageUserNameIsValid(validate(values, /@\w+/));
    setMessageHashTagIsValid(validate(values, /#\w+/));
    updateBonusButton(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { onSuccess, authService, bonusService } = props;
    const token = authService.getToken();
    try {
      await bonusService.createBonus(token, bonusText);
      setBonusTextareaValue('');
      onSuccess();
    } catch (error) {
      const parsedErrorMessage = JSON.parse(error.response.request.response).errors[0].detail;
      setHasError(true);
      setErrorMessage(parsedErrorMessage);
    }
  };

  return (
    <Form onSubmit={handleSubmit} data-testid="test-bonus-form">
      <BonusTextarea
        onChange={handleChange}
        textareaValue={bonusTextareaValue}
        messagePointsIsActive={messagePointsIsValid}
        messageUserNamesIsActive={messageUserNameIsValid}
        messageHashTagsIsActive={messageHashTagIsValid}
      />

      <div data-testid="test-error-container">{hasError && <ErrorContainer>{errorMessage}</ErrorContainer>}</div>
      <Button text={bonusButtonText} />
    </Form>
  );
};

export default SendBonusForm;
