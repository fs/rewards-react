import api from './ApiService';
import AuthService from './AuthService';
import bonusAdapter from '../adapters/bonusAdapter';

export default class CommentService {
  static async createComment(text, bonusId) {
    const apiUrl = `/user/bonuses/${bonusId}/comments`;
    const token = AuthService.getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      data: {
        type: 'comment-texts',
        attributes: {
          text,
        },
      },
    };

    const response = await api.post(apiUrl, bodyParameters, config);
    const bonusWithComment = bonusAdapter(response.data);

    return bonusWithComment[0];
  }
}
