import React from 'react';
import { shallow } from 'enzyme';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { pointItem, tagItem } from '../SendBonusForm/BonusTextarea';

import CommentTextarea from './CommentTextarea';

describe('CommentTextarea', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should show tags if user type #', () => {
    // Arrange
    const expectedPointChar = '+';
    const expectedTagChar = '#';

    // Act
    const wrapper = shallow(<CommentTextarea onChange={() => {}} />);

    const actualPointTrigger = Object.getOwnPropertyDescriptor(
      wrapper.find(ReactTextareaAutocomplete).props().trigger,
      expectedPointChar,
    );

    const actualTagTrigger = Object.getOwnPropertyDescriptor(
      wrapper.find(ReactTextareaAutocomplete).props().trigger,
      expectedTagChar,
    );

    // Assert
    expect(wrapper.find(ReactTextareaAutocomplete)).toHaveLength(1);
    expect(actualPointTrigger.value.component).toEqual(pointItem);
    expect(actualTagTrigger.value.component).toEqual(tagItem);
  });
});
