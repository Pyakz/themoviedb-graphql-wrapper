import axios from 'axios';
import { API_KEY } from './../constant';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'c24e2e0c38251c16e41291ca0067c75d',
  },
  headers: {
    'Content-Type': 'application/json',
  },
});
