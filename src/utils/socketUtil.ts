// 1. 定义配置项接口
interface IWsOptions {
  url: string;
  pingInterval?: number;
  retryInterval?: number;
  maxRetry?: number;
}

// 2. 定义消息回调函数的类型
type TMessageCallback = (data: any) => void;

export default class WebSocketClient {
  // 配置项
  private url: string; // WebSocket 地址
  private pingInterval: number; // 心跳间隔（毫秒）
  private retryInterval: number; // 重连间隔（毫秒）
  private maxRetry: number; // 最大重连次数

  // 内部状态
  private socketTask: UniApp.SocketTask | null = null; // 存储 uni.connectSocket 返回的对象
  private isConnected: boolean = false; // 连接状态
  private retryCount: number = 0; // 当前重连次数
  private isManualClose: boolean = false; // 是否是用户手动关闭（手动关闭不重连）

  // 定时器 (注意：uni/小程序环境中定时器返回 number)
  private heartbeatTimer: number | null = null; // 心跳定时器
  private reconnectTimer: number | null = null; // 重连定时器

  // 外部回调
  private onMessageCallback: TMessageCallback | null = null;

  constructor(options: IWsOptions) {
    this.url = options.url || '';
    this.pingInterval = options.pingInterval ?? 10000;
    this.retryInterval = options.retryInterval ?? 5000;
    this.maxRetry = options.maxRetry ?? 10;
  }

  /**
   * 1. 发起连接
   */
  connect() {
    this._initEventListeners();
  }

  /**
   * 2. 初始化事件监听
   */
  private _initEventListeners() {
  }

  /**
   * Send message
   * @param data 
   */
  send(data: any) {}

  /**
   * 6. 手动关闭
   * @param isManual 是否是用户意图彻底关闭（不重连）
   */
  close() {
  }

  /**
   * Reconnection logic
   */
  private reconnect() {
  }
}
