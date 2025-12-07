export type TLoginParams = {
  username: string;
  password: string;
};

export type IRegisterParams = TLoginParams & {
  repassword: string;
};

export interface IUser {
  id: number;
  /** 账号，平台唯一 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 账号状态，1:正常，0：封禁 */
  status: number;
  token: string;
  updated_at: string;
  created_at: string;
  [property: string]: any;
}
