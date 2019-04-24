import BonusPossibilitiesService, {
  apiUrl, POINTS, TAGS, USERS,
} from './BonusPossibilitiesService';
import api from './ApiService';
import {
  bonusPossibilitiesResponse,
  points,
  users,
  tags,
} from '../constants/bonusPossibilitiesResponse';

jest.mock('./ApiService');

const expectedUrl = apiUrl;

describe('BonusPossibilitiesService', () => {
  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    localStorage.setItem.mockClear();
  });

  test('fetchPossibilities happy path', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTU1NzMyMDAsInN1YiI6MzksInR5cGUiOiJhY2Nlc3MifQ.X8T7myYc-hagX-W0Y8HN8UkWOlcVbr4uwygD6zpnLsg';
    const expectedConfig = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const expectedResponse = bonusPossibilitiesResponse;

    const mockApiServiceGet = jest.fn(
      () => new Promise((resolve) => {
        resolve(expectedResponse);
      }),
    );

    api.get.mockImplementation(mockApiServiceGet);

    // Act
    const actualResponse = await BonusPossibilitiesService.fetchPossibilities(expectedToken);

    // Assert
    expect(expectedResponse).toEqual(actualResponse);
    expect(api.get).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  test('fetchPossibilities wrong token', async () => {
    // Arrange
    const expectedToken = '';
    const expectedConfig = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };
    const expectedError = {
      errors: [
        {
          id: 'e240ff55-7f10-4efa-91dc-57aef63b1100',
          title: 'Unauthorized',
        },
      ],
    };

    const mockApiServiceGet = jest.fn(
      () => new Promise((resolve, reject) => {
        reject(expectedError);
      }),
    );

    api.get.mockImplementation(mockApiServiceGet);

    let actualError;
    try {
      // Act
      await BonusPossibilitiesService.fetchPossibilities(expectedToken);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(expectedError).toEqual(actualError);
    expect(api.get).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  test('savePossibilities happy path', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTU1NzMyMDAsInN1YiI6MzksInR5cGUiOiJhY2Nlc3MifQ.X8T7myYc-hagX-W0Y8HN8UkWOlcVbr4uwygD6zpnLsg';

    const expectedResponse = bonusPossibilitiesResponse;

    const expectedUsers = JSON.stringify(users);
    const expectedPoints = JSON.stringify(points);
    const expectedTags = JSON.stringify(tags);

    const mockApiServiceGet = jest.fn(
      () => new Promise((resolve) => {
        resolve(expectedResponse);
      }),
    );

    api.get.mockImplementation(mockApiServiceGet);

    const mockFetchPossibilities = jest.spyOn(BonusPossibilitiesService, 'fetchPossibilities');

    // Act
    await BonusPossibilitiesService.savePossibilities(expectedToken);

    // Assert
    expect(mockFetchPossibilities).toHaveBeenCalledWith(expectedToken);

    expect(localStorage.setItem).toHaveBeenCalledWith(POINTS, expectedPoints);
    expect(localStorage.setItem).toHaveBeenCalledWith(TAGS, expectedTags);
    expect(localStorage.setItem).toHaveBeenCalledWith(USERS, expectedUsers);

    expect(localStorage.__STORE__[POINTS]).toBe(expectedPoints);
    expect(localStorage.__STORE__[TAGS]).toBe(expectedTags);
    expect(localStorage.__STORE__[USERS]).toBe(expectedUsers);

    expect(Object.keys(localStorage.__STORE__).length).toBe(3);
  });

  test('savePossibilities wrong token', async () => {
    const expectedToken = '';

    const expectedError = {
      errors: [
        {
          id: 'e240ff55-7f10-4efa-91dc-57aef63b1100',
          title: 'Unauthorized',
        },
      ],
    };

    const mockFetchPossibilities = jest.spyOn(BonusPossibilitiesService, 'fetchPossibilities');

    const mockApiServiceGet = jest.fn(
      () => new Promise((resolve, reject) => {
        reject(expectedError);
      }),
    );

    api.get.mockImplementation(mockApiServiceGet);

    let actualError;
    try {
      // Act
      await BonusPossibilitiesService.savePossibilities(expectedToken);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(expectedError).toEqual(actualError);
    expect(mockFetchPossibilities).toHaveBeenCalledWith(expectedToken);

    expect(localStorage.setItem).not.toHaveBeenCalledWith(POINTS, '');
    expect(localStorage.setItem).not.toHaveBeenCalledWith(TAGS, '');
    expect(localStorage.setItem).not.toHaveBeenCalledWith(USERS, '');

    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });
});
