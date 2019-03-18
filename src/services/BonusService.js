import api from './ApiService';

const apiUrl = '/user/bonuses';

export default class BonusService {
  static async createBonus(token, text) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      data: {
        type: 'bonus-texts',
        attributes: {
          text,
        },
      },
    };

    const response = await api.post(apiUrl, bodyParameters, config);
    return response;
  }

  static async updateBonusesList(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(apiUrl, config);
    return response;
  }
}
