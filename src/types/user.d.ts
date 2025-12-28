// 用户登录参数
export type TLoginParams = {
  username: string;
  password: string;
};

// 用户注册参数
export type TRegisterParams = TLoginParams & {
  repassword: string;
};

// 用户信息
export interface IUser {
  id: number;
  /** 账号，平台唯一 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 头像 */
  avatar: string;
  /** 用户token */
  token: string;
  /** 手机号 */
  phone: number;
  /** 性别 */
  sex: number;
  /** 签名 */
  sign: string;
  /** 账号状态，1:正常，0：封禁 */
  status: number;
  created_at: string;
  updated_at: string;
  [property: string]: any;
}
