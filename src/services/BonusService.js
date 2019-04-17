import api from './ApiService';

const apiUrl = '/user/bonuses';
const USERS = 'users';

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

  static async fetchBonusesList(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(apiUrl, config);
    return response;
  }

  static getUser(id) {
    const user = JSON.parse(localStorage.getItem(USERS)).filter(item => item.id === id);

    return {
      email: user[0] ? user[0].email : 'my.email@test.com',
      name: user[0] ? user[0]['full-name'] : 'My Name',
      avatar: user[0] ? user[0]['profile-image-avatar-url'] : 'https://emojis.slackmojis.com/emojis/images/1473950148/1161/react.png?1473950148',
    };
  }
}
