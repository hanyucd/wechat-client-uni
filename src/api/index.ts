import httpRequest from './httpRequest';
import type { IUser, TLoginParams, TRegisterParams } from '@/types/user';

const serverUrl = import.meta.env.VITE_API_BASE_URL;

export default {
  // 用户注册
  userRegisterApi: (param: TRegisterParams) => httpRequest<Pick<IUser, 'username'>>(`${ serverUrl }/api/user/signin`, param, 'post'),
  // 用户登录
  userLoginApi: (param: TLoginParams) => httpRequest<IUser>(`${ serverUrl }/api/user/login`, param, 'post'),
  // 退出登录
  userLogoutApi: () => httpRequest<string>(`${ serverUrl }/api/user/logout`, {}, 'post'),
  // 用户搜索
  userSearchApi: (keyword: string) => httpRequest<IUser>(`${ serverUrl }/api/user/search`, { keyword })
};
