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

const regex = { points: /\+[1-9]\d*/, userNames: /@\w+/, hashTags: /#\w+/ };

const SendBonusForm = props => {
  const [bonusText, setBonusText] = useState('');
  const [bonusTextareaValue, setBonusTextareaValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messagePointsIsValid, setMessagePointsIsValid] = useState(false);
  const [messageUserNameIsValid, setMessageUserNameIsValid] = useState(false);
  const [messageHashTagIsValid, setMessageHashTagIsValid] = useState(false);
  const [bonusButtonText, setBonusButtonText] = useState('Give');

  const validate = (values, regex) => {
    const res = values.find(value => value.match(regex));
    return !!res;
  };

  const updateBonusButton = values => {
    if (validate(values, regex.points) && validate(values, regex.userNames)) {
      setBonusButtonText(getTotalPoints(values));
    }
  };

  const getTotalPoints = values => {
    const receiversCount = values.filter(value => value.match(regex.userNames)).length;
    const points = values.find(value => value.match(regex.points)).slice(1);
    return receiversCount && points ? `+ ${receiversCount * points} Give` : 'Give';
  };

  const handleChange = event => {
    const { value } = event.target;
    const values = value.split(' ');
    setBonusText(value);
    setHasError(false);
    setErrorMessage('');
    setBonusTextareaValue(event.target.value);
    setMessagePointsIsValid(validate(values, regex.points));
    setMessageUserNameIsValid(validate(values, regex.userNames));
    setMessageHashTagIsValid(validate(values, regex.hashTags));
    updateBonusButton(values);
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
