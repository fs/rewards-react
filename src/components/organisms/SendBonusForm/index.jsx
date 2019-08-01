import React, { useState } from 'react';
import styled from 'styled-components';
import BonusTextarea from './BonusTextarea';
import Button from '../../atoms/Button';
// import Context from '../../context/Context';
import BonusService from '../../../services/BonusService';

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

  const bonusTextParser = text => {
    return text.split(' ').map(item => {
      let type = 'text';
      if (item.match(regexObj.points)) {
        type = 'points';
      }
      if (item.match(regexObj.userNames)) {
        type = 'users';
      }
      if (item.match(regexObj.hashTags)) {
        type = 'tags';
      }
      return {
        text: item,
        type,
      };
    });
  };

  const bonusItemAdapter = bonus => {
    return {
      comments: [],
      'created-at': bonus.data.attributes['created-at'],
      id: bonus.data.id,
      points: bonus.data.attributes.points,
      receivers: [
        {
          'allowance-balance': 500,
          'bonus-balance': 6,
          email: 'ivan.ananev@flatstack.com',
          'full-name': 'Ivan Ananev',
          'profile-image-avatar-url':
            'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-b50dbea6a3e28a1ae62538d4b0115b18558fac3ff7dbbee7da800b5216f97070.png',
          username: 'ivan.ananev',
        },
      ],
      sender: bonus.data.relationships.sender.data.type,
      text: bonusTextParser(bonus.data.attributes.text),
      'total-points': bonus.data.attributes['total-points'],
    };
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const createdBonus = await BonusService.createBonus(bonusText);
      bonusItemAdapter(createdBonus);

      setBonusTextareaValue('');
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
