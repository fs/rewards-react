import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';

import {
  render, wait, waitForElement,
} from 'react-testing-library';

import BonusService from '../../../services/BonusService';
import AuthService from '../../../services/AuthService';
import BonusContent from '.';

jest.mock('../../../services/BonusService');
jest.mock('../../../services/AuthService');

describe('BonusContent index', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('render BonusContent correctly', () => {
    // Arrange
    // Act
    const wrapper = render(<BonusContent />);
    // Assert
    expect(wrapper).toMatchSnapshot();
  });

  test('should call useEffect', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const expectedResponse = {
      data: {
        data: [
          {
            id: '245',
            type: 'bonuses',
            attributes: {
              text: '+1 somekek @nadezhda.kharchuk #kek-pek-cheburek #win-win-win',
              points: 1,
              'total-points': 1,
              'created-at': '2019-03-14T09:25:12.701Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '51',
                  type: 'users',
                },
              },
              comments: {
                data: [],
              },
            },
          },
          {
            id: '244',
            type: 'bonuses',
            attributes: {
              text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
              points: 1,
              'total-points': 1,
              'created-at': '2019-03-14T08:55:33.222Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
              comments: {
                data: [],
              },
            },
          },
          {
            id: '243',
            type: 'bonuses',
            attributes: {
              text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
              points: 1,
              'total-points': 1,
              'created-at': '2019-03-14T08:51:02.084Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
              comments: {
                data: [],
              },
            },
          },
          {
            id: '242',
            type: 'bonuses',
            attributes: {
              text: '+2 @timur.vafin #win-win-win',
              points: 2,
              'total-points': 2,
              'created-at': '2019-03-14T08:43:25.173Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
              comments: {
                data: [
                  {
                    id: '346',
                    type: 'comments',
                  },
                ],
              },
            },
          },
          {
            id: '241',
            type: 'bonuses',
            attributes: {
              text: '+2 @timur.vafin #win-win-win',
              points: 2,
              'total-points': 2,
              'created-at': '2019-03-14T08:43:07.490Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
              comments: {
                data: [],
              },
            },
          },
          {
            id: '240',
            type: 'bonuses',
            attributes: {
              text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
              points: 1,
              'total-points': 1,
              'created-at': '2019-03-14T08:30:00.729Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
              comments: {
                data: [],
              },
            },
          },
          {
            id: '239',
            type: 'bonuses',
            attributes: {
              text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
              points: 1,
              'total-points': 1,
              'created-at': '2019-03-11T08:50:47.661Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
              comments: {
                data: [],
              },
            },
          },
          {
            id: '238',
            type: 'bonuses',
            attributes: {
              text: ' +1 to @timur.vafin #create-awesomeness Thank you!',
              points: 1,
              'total-points': 1,
              'created-at': '2019-02-25T10:32:33.555Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
              comments: {
                data: [],
              },
            },
          },
          {
            id: '237',
            type: 'bonuses',
            attributes: {
              text: '+2 to @albert.fazullin #create-awesomeness Thank you!',
              points: 2,
              'total-points': 2,
              'created-at': '2019-02-25T08:41:21.184Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
              comments: {
                data: [],
              },
            },
          },
          {
            id: '236',
            type: 'bonuses',
            attributes: {
              text: '+1 to @albert.fazullin #create-awesomeness Thank you!',
              points: 1,
              'total-points': 1,
              'created-at': '2019-02-20T13:05:46.591Z',
            },
            relationships: {
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
              comments: {
                data: [],
              },
            },
          },
        ],
        included: [
          {
            id: '51',
            type: 'users',
            attributes: {
              email: 'albert.fazullin@flatstack.com',
              'full-name': 'Albert Fazullin',
              username: 'albert.fazullin',
              'profile-image-avatar-url': 'default-user-profile_image.svg',
              'bonus-balance': 4,
              'allowance-balance': 499,
            },
          },
          {
            id: '39',
            type: 'users',
            attributes: {
              'full-name': 'Nadezhda Kharchuk',
            },
          },
          {
            id: '346',
            type: 'comments',
            attributes: {
              'created-at': '2019-03-14T09:02:49.045Z',
              text: 'test comment\r\n',
            },
            relationships: {
              bonus: {
                data: {
                  id: '242',
                  type: 'bonuses',
                },
              },
              sender: {
                data: {
                  id: '39',
                  type: 'users',
                },
              },
            },
          },
        ],
        links: {
          self: 'http://rewards-staging.flatstack.com/api/v1/user/bonuses?page%5Bnumber%5D=1&page%5Bsize%5D=10',
          first: 'http://rewards-staging.flatstack.com/api/v1/user/bonuses?page%5Bnumber%5D=1&page%5Bsize%5D=10',
          prev: null,
          next: 'http://rewards-staging.flatstack.com/api/v1/user/bonuses?page%5Bnumber%5D=2&page%5Bsize%5D=10',
          last: 'http://rewards-staging.flatstack.com/api/v1/user/bonuses?page%5Bnumber%5D=19&page%5Bsize%5D=10',
        },
      },
    };

    const mockGetToken = jest.fn(() => expectedToken);

    AuthService.getToken.mockImplementation(mockGetToken);

    const mockFetchBonusesList = jest.fn(
      () => new Promise((resolve) => {
        resolve(expectedResponse);
      }),
    );

    BonusService.fetchBonusesList.mockImplementation(mockFetchBonusesList);

    // Act
    const { getByTestId } = render(<BonusContent />);

    const bonusList = await waitForElement(() => getByTestId('test-bonus-list'));

    // Assert
    await wait(() => {
      expect(AuthService.getToken).toBeCalled();
      expect(BonusService.fetchBonusesList).toBeCalledWith(expectedToken);
      expect(bonusList).toBeInTheDocument();
    });
  });
});
