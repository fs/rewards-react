import getToken from '../getTokenService';

export default async (email, password) => {
  const token = await getToken(email, password);
  localStorage.setItem('authToken', token);
};
