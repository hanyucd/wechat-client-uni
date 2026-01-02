import type {
  FriendCirclePermissionEnum,
  FriendApplyStatusEnum
} from '../enum/index';

// 好友信息
export interface IFriend {
  id: number;
  /** 好友账号 */
  username: string;
  /** 好友昵称 */
  nickname: string;
  /** 好友头像 */
  avatar: string;
  /** 好友性别 */
  sex: string;
  /** 好友签名 */
  sign: string;
  /** 好友地区 */
  area: string;
  /** 是否是好友 */
  isfriend: boolean;
  /** 是否已加入黑名单 */
  isblack: number;
  /** 是否已收藏 */
  isstar: number;
  /** 能否看我朋友圈 */ 
  lookme: FriendCirclePermissionEnum;
  /** 能否看他朋友圈 */
  lookhim: FriendCirclePermissionEnum;
  [property: string]: any;
}

// 好友申请参数
export interface IFriendApplyParams {
  friend_id: number;
  nickname: string;
  lookme: FriendCirclePermissionEnum;
  lookhim: FriendCirclePermissionEnum;
}

// 好友申请列表
export interface IFriendApply {
  id: number;
  /** 申请人 id */
  user_id: number;
  /** 申请人信息 */
  user: {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
  };
  /** 申请状态 */
  status: FriendApplyStatusEnum;
  /** 申请时间 */
  created_at: string;
  [property: string]: any;
}

// 处理好友申请参数
export interface IHandleFriendApplyParams {
  /** 申请id */
  applyId: number;
  /** 好友昵称 */
  nickname: string;
  /** 能否看我朋友圈 */ 
  lookme: FriendCirclePermissionEnum;
  /** 能否看他朋友圈 */
  lookhim: FriendCirclePermissionEnum;
  /** 申请状态 */
  status: FriendApplyStatusEnum;
}

// 联系人好友信息
export interface IContactFriend {
  id: number;
  friend_avatar: string;
  friend_id: number;
  friend_nickname: string;
  friend_username: string;
}

// 联系人好友列表
export interface IContact {
  /** 好友数量 */
  count: number;
  /** 字母索引列表 */
  index_list: string[];
  /** 好友列表 */
  list: Array<{
    title: string;
    list: IContactFriend[];
  }>;
}
