import React from 'react';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '../../../styles/autocomplete.css';
import BonusPossibilitiesService, { POINTS, TAGS } from '../../../services/BonusPossibilitiesService';

export const pointItem = ({ entity: { id, value } }) => (
  <div data-testid="test-point-item" key={id}>{`+♥${value}`}</div>
);

export const tagItem = ({ entity: { id, label } }) => <div data-testid="test-tag-item" key={id}>{`#${label}`}</div>;

const CommentTextarea = props => {
  const { onChange, textareaValue } = props;

  const points = BonusPossibilitiesService.getPossibilities(POINTS);
  const tags = BonusPossibilitiesService.getPossibilities(TAGS);

  return (
    <div data-testid="test-textarea-wrapper">
      <ReactTextareaAutocomplete
        className="autocomplete-textarea autocomplete-textarea--comment"
        onChange={onChange}
        value={textareaValue}
        placeholder="Add a comment"
        data-testid="test-textarea"
        loadingComponent={() => <span>Loading</span>}
        name="bonus-text"
        trigger={{
          '+': {
            dataProvider: token => points.filter(point => point.id.includes(token)),
            component: pointItem,
            output: (item, trigger) => `${trigger}${item.value.toString()}`,
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

export default CommentTextarea;
