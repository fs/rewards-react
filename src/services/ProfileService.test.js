import ProfileService from './ProfileService';
import api from './ApiService';
import AuthService from './AuthService';

jest.mock('./ApiService');
jest.mock('./AuthService');

describe('ProfileService', () => {
  const expectedUrl = '/user/profile';

  beforeEach(() => {
    jest.resetModules();
  });

  test('fetchUser Happy path', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    const expectedConfig = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };
    const expectedData = {
      id: '39',
      type: 'users',
      attributes: {
        email: 'nadezhda.kharchuk@flatstack.com',
        'full-name': 'Nadezhda Kharchuk',
        username: 'nadezhda.kharchuk',
        'profile-image-avatar-url': 'https://d14n4flg6h47l7.cloudfront.net/store/user/39/profile_image/avatar-58e3224793345ae993f75a6f373f3567.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190528%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190528T082822Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=9d3bd2740547bbffd76501b63526d4ae402e1afcc7be5584d1a2de0aaa5e7dab',
        'bonus-balance': 79,
        'allowance-balance': 469,
      },
    };

    const mockGetToken = jest.fn(() => expectedToken);

    AuthService.getToken.mockImplementation(mockGetToken);

    const mockApiGet = jest.fn(
      () => new Promise((resolve) => {
        resolve({ data: expectedData });
      }),
    );

    api.get.mockImplementation(mockApiGet);

    // Act
    const actualResult = await ProfileService.fetchUser();
    // Assert
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    expect(actualResult).toEqual(expectedData);
  });

  test('fetchUser Wrong credentials', async () => {
    // Arrange
    const expectedToken = '';
    const expectedConfig = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };
    const expectedError = {
      errors: [
        {
          id: 'bb120ac7-f407-4897-a2f3-f91fbb0a1b02',
          title: 'Unauthorized',
        },
      ],
    };

    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);

    const mockApiGet = jest.fn(
      () => new Promise((resolve, reject) => {
        reject(expectedError);
      }),
    );
    api.get.mockImplementation(mockApiGet);

    // Act
    let actualError;
    try {
      await ProfileService.fetchUser();
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledWith(expectedUrl, expectedConfig);
    expect(actualError).toEqual(expectedError);
  });
});
