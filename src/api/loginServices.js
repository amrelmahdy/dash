import {AxiosInstance} from './AxiosInstance';

export const login = async (login, password) => {
  return await AxiosInstance.post('/login', {login, password});
};
