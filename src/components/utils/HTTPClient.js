import axios from 'axios';
import domain from '../../config/env';

const endpoint = process.env.NODE_ENV ? domain[process.env.NODE_ENV] : domain.production;

const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
};

const axiosConfig = (token = null) => axios.create({
    baseURL: endpoint,
    headers: {
      ...headers,
      ...(token !== null ? { Authorization: `Bearer ${token}` } : {}),
    },
});

const requestGraphql = (body, token) => axiosConfig(token)
                                            .post('/', body);

export default requestGraphql;
