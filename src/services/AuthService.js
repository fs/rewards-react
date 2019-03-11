import api from './ApiService';

const apiUrl = '/user/tokens';

export default class AuthService {
  static TOKEN_KEY = 'authToken';

  static async authenticate(email, password) {
    const token = await AuthService.fetchToken(email, password);
    localStorage.setItem(AuthService.TOKEN_KEY, token);
  }

  static async fetchToken(email, password) {
    const response = await api.post(apiUrl, {
      data: {
        type: 'user-token-requests',
        attributes: {
          email,
          password,
        },
      },
    });
    return response.data.data.attributes.token;
  }

  static getToken() {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }
}
