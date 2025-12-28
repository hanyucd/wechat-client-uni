
// 作用是: 强制编译器将这个脚本当作模块处理。这是因为declare global必须用在模块里面
export {};

declare global {
  interface Uni {
    // 或手动定义 $uv 的结构（示例）：
    // $uv: {
    //   toast: (message: string) => void;
    //   // ...其他方法
    // };
    $uv: any;
  }

  interface IResponse<T = any> {
    code: number | string;
    msg: string;
    data: T;
  }

  interface IPageParams {
    page: number;
    size: number;
  }

  interface IPageList<T = any> {
    /** 页数 */
    page: number;
    /** 每页个数 */
    size: number;
    /** 总页数 */
    total: number;
    /** 总数 */
    count: number;
    /** 列表 */
    list: T[];
  }
}
