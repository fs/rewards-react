import React from 'react';
import { render } from '@testing-library/react';

import Bonus from '.';
import mockBonusList from '../../../mock_data/mockBonusList';

jest.mock('timeago-react');

describe('Bonus index', () => {
  test('render Bonus correctly', () => {
    // Arrange
    // Act
    const container = render(<Bonus bonus={mockBonusList[0]} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
