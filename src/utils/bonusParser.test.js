import bonusParser from './bonusParser';
import expectedData from '../mock_data/bonusResponse';
import expectedResult from '../mock_data/bonusList';

describe('Bonus parser', () => {
  test('parse correctly', () => {
    // Arrange
    // Act
    const actualResult = bonusParser(expectedData);

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });
});
