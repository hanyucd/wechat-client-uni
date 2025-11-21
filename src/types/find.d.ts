// 朋友圈动态类型
export interface IFindItem {
  avatar?: string;
  nickname?: string;
  content?: string;
  video: {
    src: string;
    poster: string;
  };
}
