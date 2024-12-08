import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-creddit.eapi.joincoded.com',
});
export default instance;
