import api from './ApiService';

const apiUrl = '/user/bonus_possibilities';
const POINTS = 'points';
const TAGS = 'tags';
const USERS = 'users';

export default class BonusPossibilitiesService {
  static async savePossibilities(token) {
    const possibilities = await BonusPossibilitiesService.fetchPosibilities(token);

    const points = possibilities.data.included
      .filter(item => item.type === POINTS)
      .map(item => ({
        id: item.id,
        value: item.attributes.value,
      }));

    const tags = possibilities.data.included
      .filter(item => item.type === TAGS)
      .map(item => ({
        id: item.id,
        label: item.attributes.label,
      }));

    const users = possibilities.data.included
      .filter(item => item.type === USERS)
      .map(item => ({
        id: item.id,
        email: item.attributes.email,
        username: item.attributes.username,
        'full-name': item.attributes['full-name'],
        'allowance-balance': item.attributes['allowance-balance'],
        'bonus-balance': item.attributes['bonus-balance'],
        'profile-image-avatar-url': item.attributes['profile-image-avatar-url'],
      }));

    localStorage.setItem(POINTS, JSON.stringify(points));
    localStorage.setItem(TAGS, JSON.stringify(tags));
    localStorage.setItem(USERS, JSON.stringify(users));
  }

  static async fetchPosibilities(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(apiUrl, config);
    return response;
  }
}
