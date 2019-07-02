import 'jest-dom/extend-expect';
import ShallowRenderer from 'react-test-renderer/shallow';

import React from 'react';

import Bonus from '.';
import bonusList from '../../../mock_data/bonusList';

describe('Bonus index', () => {
  test('render Bonus correctly', () => {
    // Arrange
    const renderer = new ShallowRenderer();
    renderer.render(<Bonus bonus={bonusList[0]} />);
    // Act
    const result = renderer.getRenderOutput();

    // Assert
    expect(result).toMatchSnapshot();
  });
});
