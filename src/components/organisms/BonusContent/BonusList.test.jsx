import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import {
  render,
} from 'react-testing-library';

import BonusList from './BonusList';

describe('BonusList', () => {
  test('Should show bonus list', async () => {
    // Arrange
    const expectedBonusList = [
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
    ];
    const expectedIsLoading = false;

    // Act
    const { getByTestId } = render(<BonusList bonusList={expectedBonusList} isLoading={expectedIsLoading} />);
    const bonusList = getByTestId('test-bonus-list');
    const bonus = getByTestId('test-bonus');

    // Assert
    expect(bonusList).toBeInTheDocument();
    expect(bonusList.children.length).toBe(10);
    expect(bonus).toBeDefined();
  });

  test('Should still loading if network error', async () => {
    // Arrange
    const expectedBonusList = [];
    const expectedIsLoading = true;

    // Act
    const { getByTestId } = render(<BonusList bonusList={expectedBonusList} isLoading={expectedIsLoading} />);
    const loader = getByTestId('test-loader');

    // Assert
    expect(loader).toBeInTheDocument();
  });
});
