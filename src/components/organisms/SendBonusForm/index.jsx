import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import BonusTextarea from './BonusTextarea';
import Button from '../../atoms/Button';
import Context from '../../context/Context';
import BonusService from '../../../services/BonusService';
import * as types from '../../../models/actionTypes';

const Form = styled.form`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 0 20px;
  padding: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const ErrorContainer = styled.div`
  display: block;
  color: #dc0000;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #ffe0e0;
  font-size: 15px;
  line-height: 1.375rem;
  font-weight: 600;
`;

const regexObj = { points: /\+[1-9]\d*/, userNames: /@\w+/, hashTags: /#\w+/ };

const SendBonusForm = () => {
  const [bonusText, setBonusText] = useState('');
  const [bonusTextareaValue, setBonusTextareaValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messagePointsIsValid, setMessagePointsIsValid] = useState(false);
  const [messageUserNameIsValid, setMessageUserNameIsValid] = useState(false);
  const [messageHashTagIsValid, setMessageHashTagIsValid] = useState(false);
  const [bonusButtonText, setBonusButtonText] = useState('Give');
  const { dispatch } = useContext(Context);

  const validate = (values, regex) => {
    const res = values.find(value => value.match(regex));
    return !!res;
  };

  const getTotalPoints = values => {
    const receiversCount = values.filter(value => value.match(regexObj.userNames)).length;
    const points = values.find(value => value.match(regexObj.points)).slice(1);
    return receiversCount && points ? `+ ${receiversCount * points} Give` : 'Give';
  };

  const updateBonusButton = values => {
    if (validate(values, regexObj.points) && validate(values, regexObj.userNames)) {
      setBonusButtonText(getTotalPoints(values));
    } else {
      setBonusButtonText('Give');
    }
  };

  const handleChange = event => {
    const { value } = event.target;
    const values = value.split(' ');
    setBonusText(value);
    setHasError(false);
    setErrorMessage('');
    setBonusTextareaValue(value);
    setMessagePointsIsValid(validate(values, regexObj.points));
    setMessageUserNameIsValid(validate(values, regexObj.userNames));
    setMessageHashTagIsValid(validate(values, regexObj.hashTags));
    updateBonusButton(values);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const bonus = await BonusService.createBonus(bonusText);

      dispatch({ type: types.UPDATE_BONUS_LIST_AFTER_ADD_BONUS_SUCCESS, payload: bonus });
      dispatch({ type: types.UPDATE_ALLOWANCE_BALANCE, payload: bonus.sender['allowance-balance'] });

      setBonusTextareaValue('');
    } catch (error) {
      let parsedErrorMessage;

      if (error.response && error.response.request && error.response.request.response) {
        parsedErrorMessage = JSON.parse(error.response.request.response).errors[0].detail;
      } else {
        console.error(error);
        parsedErrorMessage = 'Error occurred';
      }

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
