import React from 'react';
import { render } from '@testing-library/react';
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

    // Assert
    expect(bonusList).toMatchSnapshot();
  });

  test('If loading', async () => {
    // Arrange
    const expectedBonusList = [];
    const expectedIsLoading = true;

    // Act
    const { getByTestId } = render(<BonusList bonusList={expectedBonusList} isLoading={expectedIsLoading} />);
    const loader = getByTestId('test-loader');

    // Assert
    expect(loader).toMatchSnapshot();
  });

  test('If error', async () => {
    // Arrange
    const expectedBonusList = [];
    const expectedHasError = true;

    // Act
    const { getByTestId } = render(<BonusList bonusList={expectedBonusList} hasError={expectedHasError} />);
    const error = getByTestId('test-error');

    // Assert
    expect(error).toMatchSnapshot();
  });
});
