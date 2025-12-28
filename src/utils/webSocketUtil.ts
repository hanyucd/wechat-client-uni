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
    if (!this.url) {
      console.error('WS: WebSocket URL is required');
      return;
    }

    // 防止重复连接，先清理旧连接
    // if (this.socketTask) {
    //   this.close(false); // false 表示这不是用户手动彻底关闭，而是为了重置
    // }

    this.socketTask = uni.connectSocket({
      url: this.url,
      success: () => {
        console.log('WS: API调用成功，等待连接...');
      },
      fail: (err) => {
        console.error('WS: API调用失败', err);
        this.isConnected = false;
        this.reconnect(); // API 调用失败也尝试重连
      }
    });
    
    this._initEventListeners();
  }

  /**
   * 2. 初始化事件监听
   */
  private _initEventListeners() {
    if (!this.socketTask) return;

    // 监听连接成功
    this.socketTask.onOpen(() => {
      console.log('WS: 连接成功！');
      this.isConnected = true;
      this.retryCount = 0; // 重置重连次数
      this.isManualClose = false;
      // 开启心跳
      // this.startHeartbeat();
    });

    // 监听连接出错
    this.socketTask.onError((err) => {
      console.error('WS: 连接错误', err);
      this.isConnected = false;
      this.reconnect();
    });

    // 监听连接关闭
    this.socketTask.onClose((res) => {
      console.log('WS: 连接关闭', res);
      this.isConnected = false;
      // this.stopHeartbeat();

      // 如果不是手动关闭，则尝试重连
      if (!this.isManualClose) {
        this.reconnect();
      }
    });
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
