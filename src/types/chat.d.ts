export interface IChatMsgItem {
  from_user_id?: number;
  avatar?: string;
  nickname?: string;
  type?: string;
  data: string;
  options?: {
    poster?: string;
    time?: number;
  };
  create_time: string;
  isremove: boolean;
}
