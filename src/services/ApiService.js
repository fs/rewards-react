import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/vnd.api+json', Accept: 'application/vnd.api+json' },
});

export default instance;
