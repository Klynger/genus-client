import axios from 'axios';
import domain from '../../config/env';

const endpoint = process.env.NODE_ENV ? domain[process.env.NODE_ENV] : domain.production;

const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
};

export default axios.create({
  baseURL: endpoint,
  headers,
});
