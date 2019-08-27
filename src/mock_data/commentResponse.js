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
      tags: { data: [{ id: '5', type: 'tags' }] },
      comments: {
        data: [],
      },
      receivers: { data: [{ id: '154', type: 'users' }] },
    },
  },
  included: [
    { id: '2', type: 'bots', attributes: { name: 'activity' } },
    {
      id: '590',
      type: 'comments',
      attributes: { 'created-at': '2019-08-22T07:53:25.331Z', text: '+1 #win-win-win ' },
      relationships: {
        bonus: { data: { id: '554', type: 'bonuses' } },
        sender: { data: { id: '39', type: 'users' } },
        tags: { data: [{ id: '7', type: 'tags' }] },
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
          'https://d14n4flg6h47l7.cloudfront.net/store/user/39/profile_image/avatar-58e3224793345ae993f75a6f373f3567.png?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190827%2Feu-central-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20190827T074314Z\u0026X-Amz-Expires=900\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=050310c03cc61525ec5ea1a7438a9946af94167f88f437341b01754e63467402',
        'bonus-balance': 79,
        'allowance-balance': 162,
      },
    },
    {
      id: '591',
      type: 'comments',
      attributes: { 'created-at': '2019-08-22T07:54:18.453Z', text: '+1 #work-hard-play-hard ' },
      relationships: {
        bonus: { data: { id: '554', type: 'bonuses' } },
        sender: { data: { id: '39', type: 'users' } },
        tags: { data: [{ id: '5', type: 'tags' }] },
      },
    },
    {
      id: '592',
      type: 'comments',
      attributes: { 'created-at': '2019-08-27T07:37:28.375Z', text: '1' },
      relationships: {
        bonus: { data: { id: '554', type: 'bonuses' } },
        sender: { data: { id: '39', type: 'users' } },
        tags: { data: [] },
      },
    },
    {
      id: '593',
      type: 'comments',
      attributes: { 'created-at': '2019-08-27T07:38:39.776Z', text: '+1 ' },
      relationships: {
        bonus: { data: { id: '554', type: 'bonuses' } },
        sender: { data: { id: '39', type: 'users' } },
        tags: { data: [] },
      },
    },
    {
      id: '594',
      type: 'comments',
      attributes: { 'created-at': '2019-08-27T07:43:14.828Z', text: '+1 ' },
      relationships: {
        bonus: { data: { id: '554', type: 'bonuses' } },
        sender: { data: { id: '39', type: 'users' } },
        tags: { data: [] },
      },
    },
    {
      id: '154',
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
