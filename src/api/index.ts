import axios from 'axios';
import { setupInterceptors } from './interceptors';
export * as userApi from '@/api/apiUser';
export * as logApi from '@/api/apiLog';

const AxiosClient = axios.create({
  baseURL:
    !import.meta.env.VITE_USE_MOCK && import.meta.env.VITE_REACT_APP_BASE_URL
      ? import.meta.env.VITE_REACT_APP_BASE_URL
      : '',
  headers: {
    Accept: 'application/json',
  },
});

setupInterceptors(AxiosClient);

export default AxiosClient;
