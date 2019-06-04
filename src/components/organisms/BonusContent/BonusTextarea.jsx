import React from 'react';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '../../../styles/autocomplete.css';
import styled from 'styled-components';
import BonusPossibilitiesService, {
  POINTS, TAGS, USERS,
} from '../../../services/BonusPossibilitiesService';

const HelperIconsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;

`;

const ImageWrap = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #d8d8d8;
  margin-right: 10px;
  cursor: pointer;
  
  &:hover{
    background-color: rgba(0,85,112,0.7);
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

export const pointItem = ({ entity: { id, value } }) => <div data-testid="test-point-item" key={id}>{`+♥${value}`}</div>;
export const userItem = ({ entity: { id, username } }) => <div data-testid="test-user-item" key={id}>{`@${username}`}</div>;
export const tagItem = ({ entity: { id, label } }) => <div data-testid="test-tag-item" key={id}>{`#${label}`}</div>;

const BonusTextarea = (props) => {
  const { onChange, textareaValue } = props;

  const points = BonusPossibilitiesService.getPossibilities(POINTS);
  const users = BonusPossibilitiesService.getPossibilities(USERS);
  const tags = BonusPossibilitiesService.getPossibilities(TAGS);

  return (
    <div data-testid="test-textarea-wrapper">
      <HelperIconsContainer>
        <ImageWrap>
          <img src={require('../../../images/helper-icon-points.svg')} alt="User profile" />
        </ImageWrap>
        <ImageWrap>
          <img src={require('../../../images/helper-icon-user.svg')} alt="User profile" />
        </ImageWrap>
        <ImageWrap>
          <img src={require('../../../images/helper-icon-hashtag.svg')} alt="User profile" />
        </ImageWrap>
      </HelperIconsContainer>

      <ReactTextareaAutocomplete
        className="autocomplete-textarea"
        onChange={onChange}
        value={textareaValue}
        placeholder="+100 @person add description for #create_awesomness"
        data-testid="test-textarea"
        loadingComponent={() => <span>Loading</span>}
        name="bonus-text"
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
    </div>
  );
};

export default BonusTextarea;
