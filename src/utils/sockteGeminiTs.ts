// /utils/socket.ts

// 1. 定义配置项接口
interface WsOptions {
  url: string;
  pingInterval?: number; // 心跳间隔
  retryInterval?: number; // 重连间隔
  maxRetry?: number; // 最大重连次数
}

// 2. 定义消息回调函数的类型
type MessageCallback = (data: any) => void;

export default class WsClient {
  // 配置项
  private url: string;
  private pingInterval: number;
  private retryInterval: number;
  private maxRetry: number;

  // 内部状态
  private socketTask: UniApp.SocketTask | null = null;
  private isConnected: boolean = false;
  private retryCount: number = 0;
  private isManualClose: boolean = false;

  // 定时器 (注意：uni/小程序环境中定时器返回 number)
  private heartbeatTimer: number | null = null;
  private reconnectTimer: number | null = null;

  // 外部回调
  private onMessageCallback: MessageCallback | null = null;

  constructor(options: WsOptions) {
    this.url = options.url;
    this.pingInterval = options.pingInterval ?? 10000;
    this.retryInterval = options.retryInterval ?? 5000;
    this.maxRetry = options.maxRetry ?? 10;
  }

  /**
   * 1. 发起连接
   */
  public connect(): void {
    if (!this.url) {
      console.error('WS: WebSocket URL is required');
      return;
    }

    // 防止重复连接，先清理旧连接
    if (this.socketTask) {
      this.close(false); // false 表示这不是用户手动彻底关闭，而是为了重置
    }

    // --- 核心：创建连接 ---
    // @ts-ignore: uni.connectSocket 签名在某些类型定义下可能报错，忽略或断言
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

    // --- 绑定事件监听 ---
    this.initEventListeners();
  }

  /**
   * 2. 初始化事件监听
   */
  private initEventListeners(): void {
    if (!this.socketTask) return;

    // 监听连接成功
    this.socketTask.onOpen(() => {
      console.log('WS: 连接成功！');
      this.isConnected = true;
      this.retryCount = 0; // 重置重连次数
      this.isManualClose = false;

      // 开启心跳
      this.startHeartbeat();
    });

    // 监听收到消息
    this.socketTask.onMessage((res) => {
      // res.data 可能是 string 或 ArrayBuffer
      const rawData = res.data; 

      try {
        // 尝试解析 JSON
        const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

        // 拦截心跳响应 (假设后端回的是 { type: 'pong' })
        if (data && data.type === 'pong') {
          // console.log('WS: 收到心跳响应');
          return;
        }

        // 将消息通过回调传给业务层
        if (this.onMessageCallback) {
          this.onMessageCallback(data);
        }
      } catch (e) {
        console.warn('WS: 收到非JSON消息或解析错误', rawData);
        // 解析失败则原样返回
        if (this.onMessageCallback) {
          this.onMessageCallback(rawData);
        }
      }
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
      this.stopHeartbeat();

      // 如果不是手动关闭，则尝试重连
      if (!this.isManualClose) {
        this.reconnect();
      }
    });
  }

  /**
   * 3. 发送消息
   */
  public send(data: any): void {
    if (this.isConnected && this.socketTask) {
      // 统一转 JSON 字符串发送
      const sendData = typeof data === 'object' ? JSON.stringify(data) : data;
      
      this.socketTask.send({
        data: sendData,
        success: () => {
          // console.log('WS: 发送成功');
        },
        fail: (err) => {
          console.error('WS: 发送失败', err);
        }
      });
    } else {
      console.warn('WS: 未连接，无法发送消息');
    }
  }

  /**
   * 4. 心跳机制
   */
  private startHeartbeat(): void {
    this.stopHeartbeat();
    
    this.heartbeatTimer = setInterval(() => {
      // 心跳包格式需与后端约定
      this.send({ type: 'ping' });
    }, this.pingInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /**
   * 5. 自动重连机制
   */
  private reconnect(): void {
    if (this.retryCount >= this.maxRetry) {
      console.log('WS: 重连次数超限，放弃重连');
      return;
    }

    if (this.reconnectTimer) return; // 正在等待重连中，不要重复触发

    console.log(`WS: ${this.retryInterval}ms 后尝试重连... (第 ${this.retryCount + 1} 次)`);

    this.reconnectTimer = setTimeout(() => {
      this.retryCount++;
      this.connect();
      this.reconnectTimer = null;
    }, this.retryInterval);
  }

  /**
   * 6. 手动关闭
   * @param isManual 是否是用户意图彻底关闭（不重连）
   */
  public close(isManual: boolean = true): void {
    this.isManualClose = isManual;
    this.stopHeartbeat();
    
    if (this.socketTask) {
      // 这里的 close 可能会触发 onClose 事件，导致进入 reconnect
      // 所以上面设置了 isManualClose = true 来阻止重连
      this.socketTask.close({});
      this.socketTask = null;
    }
    
    // 如果有等待中的重连定时器，也清理掉
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * 注册消息接收回调
   */
  public onMessage(callback: MessageCallback): void {
    this.onMessageCallback = callback;
  }
}
