import getToken from '../adapters/getToken';

const authenticate = async (email, password) => {
  try {
    const token = await getToken(email, password);
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.log(error);
  }
};

export default authenticate;
