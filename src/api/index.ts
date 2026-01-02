import httpRequest from './httpRequest';
import type { IUser, TLoginParams, TRegisterParams } from '@/types/user';
import type {
  IFriend,
  IFriendApplyParams,
  IFriendApply,
  IHandleFriendApplyParams,
  IContact
} from '@/types/friend';

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
  // 待处理好友申请 count
  getPendingFriendApplyCountApi: () => httpRequest<{ count: number }>(`${ serverUrl }/api/friend/apply/pending/count`, {}, 'get'),
  // 获取好友申请列表
  getFriendApplyListApi: (param?: IPageParams) => httpRequest<IPageList<IFriendApply>>(`${ serverUrl }/api/friend/apply/list`, param, 'get'),
  // 处理好友申请
  postHandleFriendApplyApi: (applyId: number, param: IHandleFriendApplyParams) => httpRequest<string>(`${ serverUrl }/api/friend/apply/handle/${ applyId }`, param, 'post'),
  // 获取好友列表（通讯录）
  getContactListApi: () => httpRequest<IContact>(`${ serverUrl }/api/friend/list`, {}, 'get'),
  // 设置好友星标
  setFriendStarApi: (friendId: number, isStar: number) => httpRequest<string>(`${ serverUrl }/api/friend/set-star/${ friendId }`, { isStar }, 'post'),
  // 设置好友黑名单
  setFriendBlackApi: (friendId: number, isBlack: number) => httpRequest<string>(`${ serverUrl }/api/friend/set-black/${ friendId }`, { isBlack }, 'post'),
};
