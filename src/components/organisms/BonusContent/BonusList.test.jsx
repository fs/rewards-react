import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import {
  render,
} from 'react-testing-library';
import mockBonusList from '../../../mock_data/bonusList';

import BonusList from './BonusList';

describe('BonusList', () => {
  test('Should show bonus list', async () => {
    // Arrange

    const expectedBonusList = mockBonusList;
    const expectedIsLoading = false;

    // Act
    const { getByTestId } = render(<BonusList bonusList={expectedBonusList} isLoading={expectedIsLoading} />);
    const bonusList = getByTestId('test-bonus-list');
    const bonus = getByTestId('test-bonus');

    // Assert
    expect(bonusList).toBeInTheDocument();
    expect(bonusList.children.length).toBe(10);
    expect(bonus).toBeDefined();
  });

  test('Should still loading if network error', async () => {
    // Arrange
    const expectedBonusList = [];
    const expectedIsLoading = true;

    // Act
    const { getByTestId } = render(<BonusList bonusList={expectedBonusList} isLoading={expectedIsLoading} />);
    const loader = getByTestId('test-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
