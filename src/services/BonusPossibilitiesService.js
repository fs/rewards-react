import api from './ApiService';

export const apiUrl = '/user/bonus_possibilities';
export const POINTS = 'points';
export const TAGS = 'tags';
export const USERS = 'users';

export default class BonusPossibilitiesService {
  static async fetchPossibilities(token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(apiUrl, config);
    return response;
  }

  static async savePossibilities(token) {
    const possibilities = await BonusPossibilitiesService.fetchPossibilities(token);

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

  static getPossibilities(key) {
    const possibilities = JSON.parse(localStorage.getItem(key));
    return possibilities;
  }
}
