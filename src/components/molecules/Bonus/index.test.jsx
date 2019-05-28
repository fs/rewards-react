import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';

import {
  render,
} from 'react-testing-library';
import Bonus from '.';
import bonusList from '../../../mock_data/bonusList';


describe('Bonus index', () => {
  test('render Bonus correctly', () => {
    // Arrange
    // Act
    const wrapper = render(<Bonus bonus={bonusList[0]} />);
    // Assert
    expect(wrapper).toMatchSnapshot();
  });
});
