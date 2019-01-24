import getToken from './getTokenService';

export default async (email, password) => {
  try {
    const token = await getToken(email, password);
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.log(error);
  }
};
