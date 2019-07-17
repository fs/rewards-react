import React, { useState } from 'react';
import styled from 'styled-components';
import CommentTextarea from './CommentTextarea';
import Button from '../../atoms/Button';
import HelperIcon from '../../atoms/HelperIcon';

const Form = styled.form`
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 5px;
  margin: 0 0 20px;
  padding: 12px 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  outline: none;
`;

const ErrorContainer = styled.div`
  color: #f00;
`;

const HelperIconsContainer = styled.div`
  display: flex;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  overflow: hidden;
  height: 0;
  transition: height 500ms;
  ${({ isControlsShowing }) =>
    isControlsShowing &&
    `
    height: 55px;
  `};
`;

const regexObj = { points: /\+[1-9]\d*/, userNames: /@\w+/, hashTags: /#\w+/ };

const SendCommentForm = props => {
  const [commentTextareaValue, setCommentTextareaValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messagePointsIsValid, setMessagePointsIsValid] = useState(false);
  const [messageHashTagIsValid, setMessageHashTagIsValid] = useState(false);
  const [commentButtonText, setCommentButtonText] = useState('Add');
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

  const updateCommentButton = values => {
    if (validate(values, regexObj.points) && validate(values, regexObj.userNames)) {
      setCommentButtonText(getTotalPoints(values));
    } else {
      setCommentButtonText('Add');
    }
  };

  const handleChange = event => {
    const { value } = event.target;
    const values = value.split(' ');
    setHasError(false);
    setErrorMessage('');
    setCommentTextareaValue(value);
    setMessagePointsIsValid(validate(values, regexObj.points));
    setMessageHashTagIsValid(validate(values, regexObj.hashTags));
    updateCommentButton(values);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { onSuccess, commentService, bonusId } = props;

    try {
      await commentService.createComment(commentTextareaValue, bonusId);
      setCommentTextareaValue('');
      onSuccess();
    } catch (error) {
      const parsedErrorMessage = JSON.parse(error.response.request.response).errors[0].detail;
      setHasError(true);
      setErrorMessage(parsedErrorMessage);
    }
  };

  const handleIconClick = sign => {
    const text = commentTextareaValue && !commentTextareaValue.endsWith(' ') ? ` ${sign}` : sign;
    setCommentTextareaValue(commentTextareaValue + text);
  };

  return (
    <Form
      tabIndex={0}
      onFocus={() => setIsControlsShowing(true)}
      onBlur={() => setIsControlsShowing(false)}
      onSubmit={handleSubmit}
      data-testid="test-bonus-form"
    >
      <CommentTextarea
        onChange={handleChange}
        textareaValue={commentTextareaValue}
        messagePointsIsActive={messagePointsIsValid}
        messageHashTagsIsActive={messageHashTagIsValid}
      />
      <Controls isControlsShowing={isControlsShowing}>
        <Button text={commentButtonText} />

        <HelperIconsContainer>
          <HelperIcon
            imgPath={require('../../../images/helper-icon-points.svg')}
            alt="Points"
            isActive={messagePointsIsValid}
            onClick={() => handleIconClick('+')}
          />

          <HelperIcon
            imgPath={require('../../../images/helper-icon-hashtag.svg')}
            alt="Hashtag"
            isActive={messageHashTagIsValid}
            onClick={() => handleIconClick('#')}
          />
        </HelperIconsContainer>
      </Controls>
      <div data-testid="test-error-container">{hasError && <ErrorContainer>{errorMessage}</ErrorContainer>}</div>
    </Form>
  );
};

export default SendCommentForm;
