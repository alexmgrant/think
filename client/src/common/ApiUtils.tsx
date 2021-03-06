import axios from 'axios';

const AUTH = 'auth/';
const IDENTIFIER = 'identifier/';

export const API_URL = 'https://think-api.herokuapp.com/'; //http://localhost:3000/
export const AUTH_LOCAL = `${AUTH}local`;
export const AUTH_GITHUB = `${AUTH}github`;
export const NEXT = `${IDENTIFIER}next`;
export const CURRENT = `${IDENTIFIER}current`;

const restApi = axios.create({
  baseURL: API_URL,
});

restApi.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    config.headers.post['Content-Type'] = 'Content-Type: application/json';

    return config;
  },
  (error) => Promise.reject(error)
);

restApi.interceptors.response.use(
  (response: any) => response,
  (error) => {
    if (401 === error.response.status) {
      localStorage.removeItem('token');
      window.location.href = '/';
    } else {
      return Promise.reject(error);
    }
  }
);

const authLocal = async (payload: { email: string; password: string }) =>
  await restApi.post(AUTH_LOCAL, payload);

const authGithub = async () => await restApi.get(AUTH_GITHUB);

const getIdentifier = async () => await restApi.get(CURRENT);

const getNextIdentifier = async () => await restApi.get(NEXT);

const updateIdentifier = async (payload: { integer: number }) =>
  await restApi.put(CURRENT, payload);

export {
  authLocal,
  authGithub,
  getIdentifier,
  getNextIdentifier,
  updateIdentifier,
};
