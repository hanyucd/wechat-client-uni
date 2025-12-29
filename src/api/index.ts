import httpRequest from './httpRequest';
import type { IUser, TLoginParams, TRegisterParams } from '@/types/user';
import type { IFriend, IFriendApplyParams } from '@/types/friend';

const serverUrl = import.meta.env.VITE_API_URL;

export default {
  // 用户注册
  userRegisterApi: (param: TRegisterParams) => httpRequest<Pick<IUser, 'username'>>(`${ serverUrl }/api/user/signin`, param, 'post'),
  // 用户登录
  userLoginApi: (param: TLoginParams) => httpRequest<IUser>(`${ serverUrl }/api/user/login`, param, 'post'),
  // 退出登录
  userLogoutApi: () => httpRequest<string>(`${ serverUrl }/api/user/logout`, {}, 'post'),
  // 用户搜索
  userSearchApi: (keyword: string) => httpRequest<IUser>(`${ serverUrl }/api/user/search`, { keyword }),
  // 获取好友详情
  getFriendDetailApi: (friendId: number) => httpRequest<IFriend>(`${ serverUrl }/api/friend/info/${ friendId }`, {}, 'get'),
  // 好友申请
  postFriendApplyApi: (param: IFriendApplyParams) => httpRequest<object>(`${ serverUrl }/api/friend/apply`, param, 'post'),
};
