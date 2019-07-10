import api from './ApiService';

export default class CommentService {
  static async createComment(token, text, bonusId) {
    const apiUrl = `/user/bonuses/${bonusId}/comments`;
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
    return response;
  }
}
