import api from './ApiService';

const apiUrl = '/user/bonus_possibilities';

export default class BonusPossibilitiesService {
  static POINTS = 'points';

  static TAGS = 'tags';

  static USERS = 'users';

  static async savePossibilities(token) {
    const possibilities = await BonusPossibilitiesService.fetchPosibilities(token);
    const points = JSON.stringify(possibilities.data.included.filter(item => item.type === BonusPossibilitiesService.POINTS));
    const tags = JSON.stringify(possibilities.data.included.filter(item => item.type === BonusPossibilitiesService.TAGS));
    const users = JSON.stringify(possibilities.data.included.filter(item => item.type === BonusPossibilitiesService.USERS));

    localStorage.setItem(BonusPossibilitiesService.POINTS, points);
    localStorage.setItem(BonusPossibilitiesService.TAGS, tags);
    localStorage.setItem(BonusPossibilitiesService.USERS, users);
  }

  static async fetchPosibilities(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(apiUrl, config);
    return response;
  }
}
