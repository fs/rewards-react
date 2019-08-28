import bonusAdapter from './bonusAdapter';
import { mockFetchBonusesResponse } from '../mock_data/bonusServiseResponses';
import expectedResult from '../mock_data/mockBonusList';

describe('Bonus parser', () => {
  test('parse correctly', () => {
    // Arrange
    // Act
    const actualResult = bonusAdapter(mockFetchBonusesResponse);

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });
});
