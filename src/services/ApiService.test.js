describe('ApiService', () => {
  const mockInstance = {};

  beforeEach(() => {
    jest.resetModules();
    const mockAxios = {
      create: jest.fn(() => mockInstance),
    };
    jest.mock('axios', () => mockAxios);
  });

  test('getInstance', () => {
    // Arrange
    // Act
    const actualInstance = require('./ApiService').default;
    // Assert
    expect(actualInstance).toBe(mockInstance);
  });

  test('getInstance single instance', () => {
    // Arrange
    const expectedInstance = require('./ApiService').default;
    // Act
    const actualInstance = require('./ApiService').default;
    // Assert
    expect(actualInstance).toBe(expectedInstance);
  });
});
