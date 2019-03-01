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
    const ApiService = require('./ApiService').default;
    // Act
    const actualInstance = ApiService.getInstance();
    // Assert
    expect(actualInstance).toBe(mockInstance);
  });

  test('getInstance single instance', () => {
    // Arrange
    const ApiService = require('./ApiService').default;
    const expectedInstance = ApiService.getInstance();
    // Act
    const actualInstance = ApiService.getInstance();
    // Assert
    expect(actualInstance).toBe(expectedInstance);
  });
});
