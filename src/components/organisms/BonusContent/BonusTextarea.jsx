import React from 'react';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '../../../styles/autocomplete.css';
import BonusPossibilitiesService, {
  POINTS, TAGS, USERS,
} from '../../../services/BonusPossibilitiesService';

const BonusTextarea = (props) => {
  const { onChange } = props;
  const pointItem = ({ entity: { id, value } }) => <div key={id}>{`+♥${value}`}</div>;
  const userItem = ({ entity: { id, username } }) => <div key={id}>{`@${username}`}</div>;
  const tagItem = ({ entity: { id, label } }) => <div key={id}>{`#${label}`}</div>;

  const points = BonusPossibilitiesService.getPossibilities(POINTS);
  const users = BonusPossibilitiesService.getPossibilities(USERS);
  const tags = BonusPossibilitiesService.getPossibilities(TAGS);

  return (
    <div data-testid="test-textarea-wrapper">
      <ReactTextareaAutocomplete
        className="autocomplete-textarea"
        onChange={onChange}
        placeholder="+100 @person add description for #create_awesomness"
        data-testid="test-textarea"
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
    </div>
  )
}

export default BonusTextarea;
