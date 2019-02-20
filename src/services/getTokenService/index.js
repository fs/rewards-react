import axios from 'axios';

const apiUrl = 'http://rewards-staging.flatstack.com/api/v1/user/tokens';

export default async (email, password) => {
  const response = await axios.post(apiUrl, {
    data: {
      type: 'user-token-requests',
      attributes: {
        email,
        password,
      },
    },
  });
  return response.data.data.attributes.token;
};
