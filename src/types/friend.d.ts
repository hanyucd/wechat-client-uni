// 朋友圈查看权限枚举
export enum FriendCirclePermissionEnum {
  /** 能看 */
  CAN_VIEW = 1,
  /** 不能看 */
  CANNOT_VIEW = 0
}

// 好友申请状态枚举
export enum FriendApplyStatusEnum {
  /** 待处理 */
  PENDING = 'pending',
  /** 已同意 */
  AGREED = 'agreed',
  /** 已拒绝 */
  REJECTED = 'refuse',
  /** 已过期 */
  EXPIRED = 'expired',
  /** 已忽略 */
  IGNORED = 'ignored',
}

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
