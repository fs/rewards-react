import axios from 'axios';

const apiUrl = 'https://rewards.flatstack.com/api/v1/user/tokens';

export const getToken = async (email, password) => {
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

export const authenticate = async (email, password) => {
  try {
    const token = await authService.getToken(email, password);
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  getToken,
  authenticate,
};

export default authService;
