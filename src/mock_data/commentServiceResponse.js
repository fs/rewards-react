export default {
  data: {
    id: '555',
    type: 'bonuses',
    attributes: {
      text: '+1 @albert.fazullin #be-curious-never-stop-learning',
      points: 1,
      'total-points': 2,
      'created-at': '2019-08-28T07:41:29.988Z',
    },
    relationships: {
      sender: {
        data: {
          id: '39',
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
            id: '610',
            type: 'comments',
          },
        ],
      },
      receivers: {
        data: [
          {
            id: '51',
            type: 'users',
          },
        ],
      },
    },
  },
  included: [
    {
      id: '39',
      type: 'users',
      attributes: {
        email: 'nadezhda.kharchuk@flatstack.com',
        'full-name': 'Nadezhda Kharchuk',
        username: 'nadezhda.kharchuk',
        'profile-image-avatar-url':
          'https://d14n4flg6h47l7.cloudfront.net/store/user/39/profile_image/avatar-58e3224793345ae993f75a6f373f3567.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190828%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190828T155917Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b1721f5725ad0133033baeed0cd462a4c600379b781a5eff6ccd755ceaf6d704',
        'bonus-balance': 79,
        'allowance-balance': 141,
      },
    },
    {
      id: '610',
      type: 'comments',
      attributes: {
        'created-at': '2019-08-28T15:59:17.202Z',
        text: '+1 #create-awesomeness',
      },
      relationships: {
        bonus: {
          data: {
            id: '555',
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
      id: '51',
      type: 'users',
      attributes: {
        email: 'albert.fazullin@flatstack.com',
        'full-name': 'Albert Fazullin',
        username: 'albert.fazullin',
        'profile-image-avatar-url':
          'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-b50dbea6a3e28a1ae62538d4b0115b18558fac3ff7dbbee7da800b5216f97070.png',
        'bonus-balance': 97,
        'allowance-balance': 490,
      },
    },
  ],
};
