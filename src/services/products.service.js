import axios from 'axios';
import { API_URL } from '../constants';

const getProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export { getProducts };
