// 朋友圈查看权限枚举
export enum FriendCirclePermission {
  /** 能看 */
  CAN_VIEW = 1,
  /** 不能看 */
  CANNOT_VIEW = 0
}

// 朋友信息
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
  lookme: FriendCirclePermission;
  /** 能否看他朋友圈 */
  lookhim: FriendCirclePermission;
  [property: string]: any;
}
