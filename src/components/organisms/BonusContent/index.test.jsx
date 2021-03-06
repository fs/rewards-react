import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import BonusContent from '.';
import Context from '../../context/Context';

import mockBonusList from '../../../mock_data/mockBonusList';

describe('BonusContent index', () => {
  let isBonusListLoading;
  let hasBonusListError;
  let bonusList;
  const user = {
    id: '39',
    pointsLeft: 500,
    name: 'Ivan Pupking',
  };

  beforeEach(() => {
    isBonusListLoading = false;
    hasBonusListError = false;
    bonusList = [];

    jest.clearAllMocks();
    jest.resetModules();
  });

  test('render BonusContent while loading', () => {
    // Arrange
    isBonusListLoading = true;
    const state = {
      user,
      bonusList,
      isBonusListLoading,
      hasBonusListError,
    };

    // Act
    const { getByTestId } = render(
      <Context.Provider value={{ state }}>
        <BonusContent />
      </Context.Provider>,
    );
    const loader = getByTestId('test-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });

  test('should render BonusList', async () => {
    // Arrange
    bonusList = mockBonusList;

    const state = {
      user,
      bonusList,
      isBonusListLoading,
      hasBonusListError,
    };

    // Act
    const { getByTestId } = render(
      <Context.Provider value={{ state }}>
        <BonusContent />
      </Context.Provider>,
    );

    const bonusListItems = getByTestId('test-bonus-list');

    // Assert
    expect(bonusListItems).toBeInTheDocument();
  });

  test('should render error message if error', () => {
    // Arrange
    hasBonusListError = true;

    const state = {
      user,
      bonusList,
      isBonusListLoading,
      hasBonusListError,
    };

    // Act
    const { getByTestId } = render(
      <Context.Provider value={{ state }}>
        <BonusContent />
      </Context.Provider>,
    );
    const error = getByTestId('test-error');

    // Assert
    expect(error).toBeInTheDocument();
  });
});
