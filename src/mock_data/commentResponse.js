export default {
  data: {
    id: '289',
    type: 'bonuses',
    attributes: {
      text: '+1 to @ivan.ananev #be-curious-never-stop-learning for move',
      points: 1,
      'total-points': 1,
      'created-at': '2019-05-16T06:07:25.102Z',
    },
    relationships: {
      sender: { data: { id: '2', type: 'bots' } },
      tags: { data: [{ id: '6', type: 'tags' }] },
      comments: { data: [{ id: '603', type: 'comments' }] },
      receivers: { data: [{ id: '77', type: 'users' }] },
    },
  },
  included: [
    { id: '2', type: 'bots', attributes: { name: 'activity' } },
    {
      id: '356',
      type: 'comments',
      attributes: {
        'created-at': '2019-08-28T08:18:52.177Z',
        text: 'new test comment',
      },
      relationships: {
        bonus: { data: { id: '289', type: 'bonuses' } },
        sender: { data: { id: '39', type: 'users' } },
        tags: { data: [] },
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
          'https://d14n4flg6h47l7.cloudfront.net/store/user/39/profile_image/avatar-58e3224793345ae993f75a6f373f3567.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190828%2Feu-central-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20190828T074153Z\u0026X-Amz-Expires=900\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=e54968a2f2744d359e947b065873360a1095348c16b325d87f3ef2ee3054dde3',
        'bonus-balance': 79,
        'allowance-balance': 156,
      },
    },
    {
      id: '77',
      type: 'users',
      attributes: {
        email: 'ivan.ananev@flatstack.com',
        'full-name': 'Ivan Ananev',
        username: 'ivan.ananev',
        'profile-image-avatar-url':
          'http://doypx5fd26upp.cloudfront.net/assets/default-user-profile_image-b50dbea6a3e28a1ae62538d4b0115b18558fac3ff7dbbee7da800b5216f97070.png',
        'bonus-balance': 6,
        'allowance-balance': 500,
      },
    },
  ],
};
