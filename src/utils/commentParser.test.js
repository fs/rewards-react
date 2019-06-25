import commentParser from './commentParser';
import expectedData from '../mock_data/bonusResponse';
import expectedResult from '../mock_data/commentList';

describe('Comment parser', () => {
  test('parse correctly', () => {
    // Arrange
    // Act
    const actualResult = commentParser(expectedData);

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });
});
