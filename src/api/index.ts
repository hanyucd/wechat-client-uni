import httpRequest from './httpRequest';
import type { IUser, TLoginParams } from '@/types/user';

const serverUrl = import.meta.env.VITE_API_BASE_URL;

export default {
  // 用户登录
  userLoginApi: (param: TLoginParams) => httpRequest<IUser>(`${ serverUrl }/api/user/login`, param, 'post'),
};
