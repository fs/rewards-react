import getToken from './getTokenService';

const authenticate = async (email, password) => {
  try {
    const token = await getToken(email, password);
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.log(error);
  }
};

export default authenticate;
