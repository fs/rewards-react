import axios from 'axios';

const apiUrl = 'http://rewards-staging.flatstack.com/api/v1/user/bonuses';

export default async (token, text) => {
  var config = {
    headers: { Authorization: 'bearer ' + token },
  };

  var bodyParameters = {
    data: {
      type: 'bonus-texts',
      attributes: {
        text: text,
      },
    },
  };

  const response = await axios.post(apiUrl, bodyParameters, config);

  return response;
};
