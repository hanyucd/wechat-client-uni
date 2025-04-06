export interface IChatMsgItem {
  from_user_id?: number;
  avatar?: string;
  nickname?: string;
  type?: string;
  data: string;
  options?: {
    poster?: string;
  };
  create_time: string;
  isremove: boolean;
}
