import axios from 'axios';

let instance = null;

export default class ApiService {
  static getInstance() {
    if (!instance) {
      instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: { 'Content-Type': 'application/vnd.api+json', Accept: 'application/vnd.api+json' },
      });
    }
    return instance;
  }
}
