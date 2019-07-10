export default {
  data: {
    id: '460',
    type: 'bonuses',
    attributes: {
      text: '+5 @almaz.karimullin #be-curious-never-stop-learning ',
      points: 5,
      'total-points': 67,
      'created-at': '2019-06-11T15:35:22.447Z',
    },
    relationships: {
      sender: {
        data: {
          id: '63',
          type: 'users',
        },
      },
      tags: {
        data: [
          {
            id: '6',
            type: 'tags',
          },
        ],
      },
      comments: {
        data: [
          {
            id: '514',
            type: 'comments',
          },
        ],
      },
      receivers: {
        data: [
          {
            id: '50',
            type: 'users',
          },
        ],
      },
    },
  },
  included: [
    {
      id: '63',
      type: 'users',
      attributes: {
        email: 'mariya.valeeva@flatstack.com',
        'full-name': 'Mariya Valeeva',
        username: 'mariya-valeeva',
        'profile-image-avatar-url':
          'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-b50dbea6a3e28a1ae62538d4b0115b18558fac3ff7dbbee7da800b5216f97070.png',
        'bonus-balance': 8471,
        'allowance-balance': 817,
      },
    },
    {
      id: '514',
      type: 'comments',
      attributes: {
        'created-at': '2019-07-10T08:27:51.007Z',
        text: '+62 Voluptas accusamus repudiandae quibusdam aut temporibus. #consequatur-qui-magni',
      },
      relationships: {
        bonus: {
          data: {
            id: '460',
            type: 'bonuses',
          },
        },
        sender: {
          data: {
            id: '39',
            type: 'users',
          },
        },
        tags: {
          data: [],
        },
      },
    },
    {
      id: '39',
      type: 'users',
      attributes: {
        email: 'nadezhda.kharchuk@flatstack.com',
        'full-name': 'Nadezhda Kharchuk',
        username: 'nadezhda.kharchuk',
        'profile-image-avatar-url':
          'https://d14n4flg6h47l7.cloudfront.net/store/user/39/profile_image/avatar-58e3224793345ae993f75a6f373f3567.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190710%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190710T082753Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=791588a135c4c4e4473e35576a269b07e4897f5c55023b6dd6536bdec5df3240',
        'bonus-balance': 79,
        'allowance-balance': 374,
      },
    },
  ],
};
