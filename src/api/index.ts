import httpRequest from './httpRequest';
import type { IUser, TLoginParams, IRegisterParams } from '@/types/user';

const serverUrl = import.meta.env.VITE_API_BASE_URL;

export default {
  // 用户注册
  userRegisterApi: (param: IRegisterParams) => httpRequest<IUser>(`${ serverUrl }/api/user/signin`, param, 'post'),
  // 用户登录
  userLoginApi: (param: TLoginParams) => httpRequest<IUser>(`${ serverUrl }/api/user/login`, param, 'post'),
  // 退出登录
  userLogoutApi: () => httpRequest(`${ serverUrl }/api/user/logout`, {}, 'post')
};
