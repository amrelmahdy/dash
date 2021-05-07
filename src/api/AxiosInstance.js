import axios from 'axios';
import {getItemFromAsyncStorage} from './helpers';
import { baseLink } from './../config'

export const configureAxiosInterceptors = () => {
  axios.interceptors.request.use(async req => {
    console.log("config", req)
    const token = await getItemFromAsyncStorage('@auth-token');
    if(token){
      req.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      req.headers.lang = 'en';
    }
    
    return req;
  });
};

export const AxiosInstance = axios.create({
  baseURL: baseLink,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
