import axios from 'axios';
import { API_KEY } from './../constant';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});
