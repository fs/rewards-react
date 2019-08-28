import api from './ApiService';
import AuthService from './AuthService';
import bonusAdapter from '../adapters/bonusAdapter';

const apiUrl = '/user/bonuses';
export default class BonusService {
  static async createBonus(text) {
    const token = AuthService.getToken();
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
    const bonus = bonusAdapter(response.data);

    return bonus[0];
  }

  static async fetchBonusesList() {
    const token = AuthService.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(apiUrl, config);
    const bonusList = bonusAdapter(response.data);

    return bonusList;
  }
}
