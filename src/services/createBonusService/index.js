import axios from 'axios';

const apiUrl = 'http://rewards-staging.flatstack.com/api/v1/user/bonuses';

export default async (token, text) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const bodyParameters = {
    data: {
      type: 'bonus-texts',
      attributes: {
        text,
      },
    },
  };

  const response = await axios.post(apiUrl, bodyParameters, config);

  return response;
};
