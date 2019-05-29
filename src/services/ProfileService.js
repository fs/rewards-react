import api from './ApiService';
import AuthService from './AuthService';

const profileUrl = '/user/profile';

export default class ProfileService {
  static async fetchUser() {
    const token = AuthService.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await api.get(profileUrl, config);
    return response.data;
  }
}
