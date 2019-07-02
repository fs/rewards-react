import React, { useState } from 'react';
import styled from 'styled-components';
import CommentTextarea from './CommentTextarea';
import Button from '../../atoms/Button';
import HelperIcon from '../../atoms/HelperIcon';

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

const HelperIconsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  height: 55px;
  ${({ isControlsShowing }) =>
    isControlsShowing &&
    `
    height: 0;
  `}
`;

const regexObj = { points: /\+[1-9]\d*/, userNames: /@\w+/, hashTags: /#\w+/ };

const Index = props => {
  const [bonusText, setBonusText] = useState('');
  const [bonusTextareaValue, setBonusTextareaValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messagePointsIsValid, setMessagePointsIsValid] = useState(false);
  const [messageHashTagIsValid, setMessageHashTagIsValid] = useState(false);
  const [bonusButtonText, setBonusButtonText] = useState('Add');
  const [isControlsShowing, setIsControlsShowing] = useState(false);

  const validate = (values, regex) => {
    const res = values.find(value => value.match(regex));
    return !!res;
  };

  const getTotalPoints = values => {
    const receiversCount = values.filter(value => value.match(regexObj.userNames)).length;
    const points = values.find(value => value.match(regexObj.points)).slice(1);
    return receiversCount && points ? `+ ${receiversCount * points} Add` : 'Add';
  };

  const updateBonusButton = values => {
    if (validate(values, regexObj.points) && validate(values, regexObj.userNames)) {
      setBonusButtonText(getTotalPoints(values));
    } else {
      setBonusButtonText('Add');
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
    setMessageHashTagIsValid(validate(values, regexObj.hashTags));
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

  const toggleControlsVisibility = () => {
    setIsControlsShowing(!isControlsShowing);
  };

  return (
    <Form onSubmit={handleSubmit} data-testid="test-bonus-form">
      <CommentTextarea
        onChange={handleChange}
        textareaValue={bonusTextareaValue}
        messagePointsIsActive={messagePointsIsValid}
        messageHashTagsIsActive={messageHashTagIsValid}
        onFocus={toggleControlsVisibility}
        onBlur={toggleControlsVisibility}
      />
      <Controls isControlsShowing={isControlsShowing}>
        <Button text={bonusButtonText} />

        <HelperIconsContainer>
          <HelperIcon
            imgPath={require('../../../images/helper-icon-points.svg')}
            alt="Points"
            isActive={messagePointsIsValid}
          />

          <HelperIcon
            imgPath={require('../../../images/helper-icon-hashtag.svg')}
            alt="Hashtag"
            isActive={messageHashTagIsValid}
          />
        </HelperIconsContainer>
      </Controls>
      <div data-testid="test-error-container">{hasError && <ErrorContainer>{errorMessage}</ErrorContainer>}</div>
    </Form>
  );
};

export default Index;
