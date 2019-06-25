import api from './ApiService';

export default class CommentService {
  static async createComment(token, text, id) {
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

    const response = await api.post(`user/bonuses/${id}/comments`, bodyParameters, config);
    return response;
  }
}
