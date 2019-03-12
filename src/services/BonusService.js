import axios from 'axios';

const apiUrl = '/user/bonuses';

export default class BonusService {
  static async createBonus(token, text) {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const bodyParameters = {
      data: {
        type: 'bonus-texts',
        attributes: {
          text,
        },
      },
    };

    const response = await axios.post(apiUrl, bodyParameters, config);
    return response;
  }
}
