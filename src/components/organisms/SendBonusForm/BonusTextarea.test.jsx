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

  describe('Autocomplete Items', () => {
    test('pointItem', () => {
      // Arrange
      const expectedEntity = {
        entity: {
          id: '10',
          value: '25',
        },
      };

      // Act
      const actualPointItem = pointItem(expectedEntity);

      // Assert
      expect(actualPointItem).toMatchSnapshot();
    });

    test('userItem', () => {
      // Arrange
      const expectedEntity = {
        entity: {
          id: '10',
          username: 'albert.fazullin',
        },
      };

      // Act
      const actualUserItem = userItem(expectedEntity);

      // Assert
      expect(actualUserItem).toMatchSnapshot();
    });

    test('tagItem', () => {
      // Arrange
      const expectedEntity = {
        entity: {
          id: '10',
          label: 'win-win-win',
        },
      };

      // Act
      const actualTagItem = tagItem(expectedEntity);

      // Assert
      expect(actualTagItem).toMatchSnapshot();
    });
  });
});
