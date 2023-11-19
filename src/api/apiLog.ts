import AxiosClient from '.';
import { ILogSearch } from '@/types';

const url = '/audit-log';

export const getAllLog = async (params?: ILogSearch) => {
  const res = await AxiosClient.get(url, { params });
  return res.data;
};
