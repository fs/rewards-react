import React from 'react';
import { shallow } from 'enzyme';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';

import BonusTextarea, { pointItem, userItem, tagItem } from './BonusTextarea';

describe('BonusTextarea', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should show tags if user type #', () => {
    // Arrange
    const expectedPointChar = '+';
    const expectedUserChar = '@';
    const expectedTagChar = '#';

    // Act
    const wrapper = shallow(<BonusTextarea onChange={() => {}} />);

    const actualPointTrigger = Object.getOwnPropertyDescriptor(
      wrapper.find(ReactTextareaAutocomplete).props().trigger,
      expectedPointChar,
    );
    const actualUserTrigger = Object.getOwnPropertyDescriptor(
      wrapper.find(ReactTextareaAutocomplete).props().trigger,
      expectedUserChar,
    );
    const actualTagTrigger = Object.getOwnPropertyDescriptor(
      wrapper.find(ReactTextareaAutocomplete).props().trigger,
      expectedTagChar,
    );

    // Assert
    expect(wrapper.find(ReactTextareaAutocomplete)).toHaveLength(1);
    expect(actualPointTrigger.value.component).toEqual(pointItem);
    expect(actualUserTrigger.value.component).toEqual(userItem);
    expect(actualTagTrigger.value.component).toEqual(tagItem);
  });
});
