import api from './ApiService';

const apiUrl = '/user/bonus_possibilities';

export default class BonusPossibilitiesService {
  static async fetchPosibilities(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(apiUrl, config);
    return response;
  }
}
