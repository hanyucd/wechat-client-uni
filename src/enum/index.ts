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
  AGREED = 'agree',
  /** 已拒绝 */
  REJECTED = 'refuse',
  /** 已过期 */
  EXPIRED = 'expire',
  /** 已忽略 */
  IGNORED = 'ignore',
}
