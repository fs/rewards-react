export default class AuthService {
  static async authenticate() {
    console.log('authenticate');
  }

  static async fetchToken() {
    return 'token';
  }

  static getToken() {
    return 'token';
  }
}
