import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import Button from '../../atoms/Button';
import '@webscopeio/react-textarea-autocomplete/style.css';
import BonusPossibilitiesService, {
  POINTS, TAGS, USERS,
} from '../../../services/BonusPossibilitiesService';

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

  const pointItem = ({ entity: { id, value } }) => <div key={id}>{`+♥${value}`}</div>;
  const userItem = ({ entity: { id, username } }) => <div key={id}>{`@${username}`}</div>;
  const tagItem = ({ entity: { id, label } }) => <div key={id}>{`#${label}`}</div>;

  const points = BonusPossibilitiesService.getPossibilities(POINTS);
  const users = BonusPossibilitiesService.getPossibilities(USERS);
  const tags = BonusPossibilitiesService.getPossibilities(TAGS);

  return (
    <Form onSubmit={handleSubmit} data-testid="test-bonus-form">
      <Textarea
        name="bonustext"
        onChange={handleChange}
        placeholder="+100 @person add description for #create_awesomness"
        data-testid="test-textarea"
      />

      <ReactTextareaAutocomplete
        className="my-textarea"
        onChange={handleChange}
        loadingComponent={() => <span>Loading</span>}
        trigger={{
          '+': {
            dataProvider: token => points.filter(point => point.id.includes(token)),
            component: pointItem,
            output: (item, trigger) => `${trigger}${(item.value).toString()}`,
          },
          '@': {
            dataProvider: token => users.filter(user => user.username.includes(token)),
            component: userItem,
            output: (item, trigger) => `${trigger}${item.username}`,
          },
          '#': {
            dataProvider: token => tags.filter(tag => tag.label.includes(token)),
            component: tagItem,
            output: (item, trigger) => `${trigger}${item.label}`,
          },
        }}
        minChar="0"
      />

      <div data-testid="test-error-container">
        {hasError
          && <ErrorContainer>{errorMessage}</ErrorContainer>
        }
      </div>
      <Button text="Give" data-testid="test-button" />
    </Form>
  );
};

export default SendBonusForm;
