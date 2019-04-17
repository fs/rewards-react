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
    // const expectedBonusList = [
    //   {
    //     id: '245',
    //     type: 'bonuses',
    //     attributes: {
    //       text: '+1 somekek @nadezhda.kharchuk #kek-pek-cheburek #win-win-win',
    //       points: 1,
    //       'total-points': 1,
    //       'created-at': '2019-03-14T09:25:12.701Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '51',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [],
    //       },
    //     },
    //   },
    //   {
    //     id: '244',
    //     type: 'bonuses',
    //     attributes: {
    //       text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
    //       points: 1,
    //       'total-points': 1,
    //       'created-at': '2019-03-14T08:55:33.222Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '39',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [],
    //       },
    //     },
    //   },
    //   {
    //     id: '243',
    //     type: 'bonuses',
    //     attributes: {
    //       text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
    //       points: 1,
    //       'total-points': 1,
    //       'created-at': '2019-03-14T08:51:02.084Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '39',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [],
    //       },
    //     },
    //   },
    //   {
    //     id: '242',
    //     type: 'bonuses',
    //     attributes: {
    //       text: '+2 @timur.vafin #win-win-win',
    //       points: 2,
    //       'total-points': 2,
    //       'created-at': '2019-03-14T08:43:25.173Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '39',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [
    //           {
    //             id: '346',
    //             type: 'comments',
    //           },
    //         ],
    //       },
    //     },
    //   },
    //   {
    //     id: '241',
    //     type: 'bonuses',
    //     attributes: {
    //       text: '+2 @timur.vafin #win-win-win',
    //       points: 2,
    //       'total-points': 2,
    //       'created-at': '2019-03-14T08:43:07.490Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '39',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [],
    //       },
    //     },
    //   },
    //   {
    //     id: '240',
    //     type: 'bonuses',
    //     attributes: {
    //       text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
    //       points: 1,
    //       'total-points': 1,
    //       'created-at': '2019-03-14T08:30:00.729Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '39',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [],
    //       },
    //     },
    //   },
    //   {
    //     id: '239',
    //     type: 'bonuses',
    //     attributes: {
    //       text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
    //       points: 1,
    //       'total-points': 1,
    //       'created-at': '2019-03-11T08:50:47.661Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '39',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [],
    //       },
    //     },
    //   },
    //   {
    //     id: '238',
    //     type: 'bonuses',
    //     attributes: {
    //       text: ' +1 to @timur.vafin #create-awesomeness Thank you!',
    //       points: 1,
    //       'total-points': 1,
    //       'created-at': '2019-02-25T10:32:33.555Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '39',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [],
    //       },
    //     },
    //   },
    //   {
    //     id: '237',
    //     type: 'bonuses',
    //     attributes: {
    //       text: '+2 to @albert.fazullin #create-awesomeness Thank you!',
    //       points: 2,
    //       'total-points': 2,
    //       'created-at': '2019-02-25T08:41:21.184Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '39',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [],
    //       },
    //     },
    //   },
    //   {
    //     id: '236',
    //     type: 'bonuses',
    //     attributes: {
    //       text: '+1 to @albert.fazullin #create-awesomeness Thank you!',
    //       points: 1,
    //       'total-points': 1,
    //       'created-at': '2019-02-20T13:05:46.591Z',
    //     },
    //     relationships: {
    //       sender: {
    //         data: {
    //           id: '39',
    //           type: 'users',
    //         },
    //       },
    //       comments: {
    //         data: [],
    //       },
    //     },
    //   },
    // ];

    const expectedBonusList = [
      {
        id: '272',
        'created-at': '2019-04-10T13:21:48.360Z',
        points: 10,
        text: [
          {
            type: 'count',
            text: '+10',
          },
          {
            type: 'receiver',
            text: '@marsel.mustafin',
          },
          {
            type: 'text',
            text: '',
          },
          {
            type: 'tag',
            text: '#be-curious-never-stop-learning',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 10,
        commnets: {
          data: [],
        },
        'sender-id': '62',
        sender: {
          email: 'olga.krasnova@flatstack.com',
          name: 'Olga Krasnova',
          avatar: 'https://d14n4flg6h47l7.cloudfront.net/store/user/62/profile_image/avatar-9c17bcabdb06f23cc9c93a1d6994bc1a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=a3649ea87568d0e39cf0f1396c0d4f0b08f765c98f48dc74c6eafdaa9870a935',
        },
      },
      {
        id: '271',
        'created-at': '2019-04-09T10:14:57.993Z',
        points: 5,
        text: [
          {
            type: 'receiver',
            text: '@artem.biserov',
          },
          {
            type: 'tag',
            text: '#be-curious-never-stop-learning',
          },
          {
            type: 'count',
            text: '+5',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 5,
        commnets: {
          data: [
            {
              id: '354',
              type: 'comments',
            },
          ],
        },
        'sender-id': '63',
        sender: {
          email: 'mariya.valeeva@flatstack.com',
          name: 'Mariya Valeeva',
          avatar: 'https://d14n4flg6h47l7.cloudfront.net/store/user/63/profile_image/avatar-33139013e0e2bfac3c20a9ccd20701e2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=3dae1835bacd618d968dd31f0e32c6804054c87ef84d51f0adb38caad7667212',
        },
      },
      {
        id: '270',
        'created-at': '2019-04-09T10:11:00.552Z',
        points: 5,
        text: [
          {
            type: 'count',
            text: '+5',
          },
          {
            type: 'text',
            text: '',
          },
          {
            type: 'receiver',
            text: '@albert.fazullin',
          },
          {
            type: 'text',
            text: '',
          },
          {
            type: 'tag',
            text: '#be-curious-never-stop-learning',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 5,
        commnets: {
          data: [],
        },
        'sender-id': '63',
        sender: {
          email: 'mariya.valeeva@flatstack.com',
          name: 'Mariya Valeeva',
          avatar: 'https://d14n4flg6h47l7.cloudfront.net/store/user/63/profile_image/avatar-33139013e0e2bfac3c20a9ccd20701e2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=3dae1835bacd618d968dd31f0e32c6804054c87ef84d51f0adb38caad7667212',
        },
      },
      {
        id: '268',
        'created-at': '2019-04-05T09:48:22.916Z',
        points: 10,
        text: [
          {
            type: 'count',
            text: '+10',
          },
          {
            type: 'receiver',
            text: '@mariya-valeeva',
          },
          {
            type: 'tag',
            text: '#be-curious-never-stop-learning',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 10,
        commnets: {
          data: [],
        },
        'sender-id': '61',
        sender: {
          email: 'marsel.mustafin@flatstack.com',
          name: 'Marsel Mustafin',
          avatar: 'https://d14n4flg6h47l7.cloudfront.net/store/user/61/profile_image/avatar-de7a692eca9581eaf730131e33ee4fa7.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=42f545f3d3d4d9e7a9fb00d69fa48574cb8d2fdd02ab867ec3ce44163b13bfcb',
        },
      },
      {
        id: '264',
        'created-at': '2019-04-03T12:50:39.609Z',
        points: 5,
        text: [
          {
            type: 'receiver',
            text: '@timur.vafin',
          },
          {
            type: 'tag',
            text: '#be-curious-never-stop-learning',
          },
          {
            type: 'text',
            text: 'testing',
          },
          {
            type: 'text',
            text: 'emails',
          },
          {
            type: 'count',
            text: '+5',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 31,
        commnets: {
          data: [
            {
              id: '352',
              type: 'comments',
            },
            {
              id: '353',
              type: 'comments',
            },
          ],
        },
        'sender-id': '68',
        sender: {
          email: 'me@timurv.ru',
          name: 'Timur Vafin',
          avatar: 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
        },
      },
      {
        id: '263',
        'created-at': '2019-04-03T09:31:45.835Z',
        points: 10,
        text: [
          {
            type: 'count',
            text: '+10',
          },
          {
            type: 'receiver',
            text: '@marsel.mustafin',
          },
          {
            type: 'tag',
            text: '#create-awesomeness',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 10,
        commnets: {
          data: [],
        },
        'sender-id': '63',
        sender: {
          email: 'mariya.valeeva@flatstack.com',
          name: 'Mariya Valeeva',
          avatar: 'https://d14n4flg6h47l7.cloudfront.net/store/user/63/profile_image/avatar-33139013e0e2bfac3c20a9ccd20701e2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=3dae1835bacd618d968dd31f0e32c6804054c87ef84d51f0adb38caad7667212',
        },
      },
      {
        id: '262',
        'created-at': '2019-04-03T09:29:47.173Z',
        points: 100,
        text: [
          {
            type: 'count',
            text: '+100',
          },
          {
            type: 'receiver',
            text: '@marsel.mustafin',
          },
          {
            type: 'tag',
            text: '#create-awesomeness',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 100,
        commnets: {
          data: [],
        },
        'sender-id': '63',
        sender: {
          email: 'mariya.valeeva@flatstack.com',
          name: 'Mariya Valeeva',
          avatar: 'https://d14n4flg6h47l7.cloudfront.net/store/user/63/profile_image/avatar-33139013e0e2bfac3c20a9ccd20701e2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=3dae1835bacd618d968dd31f0e32c6804054c87ef84d51f0adb38caad7667212',
        },
      },
      {
        id: '261',
        'created-at': '2019-04-01T10:20:33.245Z',
        points: 5,
        text: [
          {
            type: 'count',
            text: '+5',
          },
          {
            type: 'receiver',
            text: '@nail.aliev',
          },
          {
            type: 'tag',
            text: '#test',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 5,
        commnets: {
          data: [],
        },
        'sender-id': '6',
        sender: {
          email: 'example+email@example.com',
          name: 'John Smith',
          avatar: 'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-8840d077a11aa734bcdd9e3d58eed663c3262440203b2560bd22ca39d72e14bf.svg',
        },
      },
      {
        id: '260',
        'created-at': '2019-03-29T12:38:32.519Z',
        points: 25,
        text: [
          {
            type: 'receiver',
            text: '@krasnova-olga',
          },
          {
            type: 'count',
            text: '+25',
          },
          {
            type: 'tag',
            text: '#be-curious-never-stop-learning',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 25,
        commnets: {
          data: [],
        },
        'sender-id': '63',
        sender: {
          email: 'mariya.valeeva@flatstack.com',
          name: 'Mariya Valeeva',
          avatar: 'https://d14n4flg6h47l7.cloudfront.net/store/user/63/profile_image/avatar-33139013e0e2bfac3c20a9ccd20701e2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=3dae1835bacd618d968dd31f0e32c6804054c87ef84d51f0adb38caad7667212',
        },
      },
      {
        id: '259',
        'created-at': '2019-03-26T09:56:19.905Z',
        points: 2,
        text: [
          {
            type: 'count',
            text: '+2',
          },
          {
            type: 'receiver',
            text: '@marsel.mustafin',
          },
          {
            type: 'tag',
            text: '#be-curious-never-stop-learning',
          },
          {
            type: 'text',
            text: '',
          },
        ],
        'total-points': 2,
        commnets: {
          data: [],
        },
        'sender-id': '62',
        sender: {
          email: 'olga.krasnova@flatstack.com',
          name: 'Olga Krasnova',
          avatar: 'https://d14n4flg6h47l7.cloudfront.net/store/user/62/profile_image/avatar-9c17bcabdb06f23cc9c93a1d6994bc1a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190417%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190417T074100Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=a3649ea87568d0e39cf0f1396c0d4f0b08f765c98f48dc74c6eafdaa9870a935',
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
