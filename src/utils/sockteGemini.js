// /utils/socket.js

export default class WsClient {
  constructor(options = {}) {
    // 配置项
    this.url = options.url || ''; // WebSocket 地址
    this.pingInterval = options.pingInterval || 10000; // 心跳间隔（毫秒）
    this.retryInterval = options.retryInterval || 5000; // 重连间隔（毫秒）
    this.maxRetry = options.maxRetry || 10; // 最大重连次数

    // 内部状态
    this.socketTask = null; // 存储 uni.connectSocket 返回的对象
    this.isConnected = false; // 连接状态
    this.retryCount = 0; // 当前重连次数
    this.heartbeatTimer = null; // 心跳定时器
    this.reconnectTimer = null; // 重连定时器
    this.isManualClose = false; // 是否是用户手动关闭（手动关闭不重连）

    // 外部回调函数（用于把消息传出去）
    this.onMessageCallback = null; 
  }

  /**
   * 1. 发起连接
   */
  connect() {
    if (!this.url) {
      console.error('WebSocket URL is required');
      return;
    }
    
    // 如果已存在连接，先关闭，防止重复
    if (this.socketTask) {
      this.socketTask.close();
    }

    // --- 核心：创建连接 ---
    this.socketTask = uni.connectSocket({
      url: this.url,
      success: () => {
        console.log('WS: 开始连接...');
      },
      fail: (err) => {
        console.error('WS: 连接失败 API 调用错误', err);
      }
    });

    // --- 绑定事件监听 ---
    this.initEventListeners();
  }

  /**
   * 2. 初始化事件监听
   */
  initEventListeners() {
    // 监听连接成功
    this.socketTask.onOpen((res) => {
      console.log('WS: 连接成功！');
      this.isConnected = true;
      this.retryCount = 0; // 重置重连次数
      this.isManualClose = false;
      
      // 开启心跳
      this.startHeartbeat();
    });

    // 监听收到消息
    this.socketTask.onMessage((res) => {
      // 这里的 res.data 通常是 JSON 字符串，建议解析
      try {
        const data = JSON.parse(res.data);
        
        // 如果后端有特定的“心跳响应”格式（比如 type='pong'），可以在这里拦截，不传给业务层
        if (data.type === 'pong') {
          console.log('WS: 收到心跳响应');
          return; 
        }

        // 将消息通过回调传给业务层
        if (this.onMessageCallback) {
          this.onMessageCallback(data);
        }
      } catch (e) {
        console.warn('WS: 收到非JSON格式消息', res.data);
        // 如果不是JSON，直接原样传回
        if (this.onMessageCallback) this.onMessageCallback(res.data);
      }
    });

    // 监听连接出错
    this.socketTask.onError((err) => {
      console.error('WS: 连接错误', err);
      this.isConnected = false;
      this.reconnect(); // 触发重连
    });

    // 监听连接关闭
    this.socketTask.onClose((res) => {
      console.log('WS: 连接关闭', res);
      this.isConnected = false;
      
      // 清除心跳
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
  send(data) {
    if (this.isConnected && this.socketTask) {
      // 统一转 JSON 发送
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
      // 可选：这里可以做一个消息队列，等连上了再发
    }
  }

  /**
   * 4. 心跳机制 (Ping)
   * 定时向服务器发一个包，证明我还活着
   */
  startHeartbeat() {
    this.stopHeartbeat(); // 先清除旧的
    this.heartbeatTimer = setInterval(() => {
      // 发送心跳包，具体格式看你后端约定，常见的是 { type: 'ping' } 或者直接字符串 'ping'
      this.send({ type: 'ping' }); 
    }, this.pingInterval);
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /**
   * 5. 自动重连机制
   */
  reconnect() {
    // 如果已经重连超过最大次数，停止尝试
    if (this.retryCount >= this.maxRetry) {
      console.log('WS: 重连失败次数过多，放弃重连');
      return;
    }

    // 防止重复触发重连
    if (this.reconnectTimer) return;

    console.log(`WS: 准备在 ${this.retryInterval}ms 后尝试重连... (第 ${this.retryCount + 1} 次)`);
    
    this.reconnectTimer = setTimeout(() => {
      this.retryCount++;
      this.connect(); // 重新调用连接
      this.reconnectTimer = null; // 重置定时器句柄
    }, this.retryInterval);
  }

  /**
   * 6. 手动关闭
   */
  close() {
    this.isManualClose = true; // 标记为手动关闭，防止触发重连
    this.stopHeartbeat();
    if (this.socketTask) {
      this.socketTask.close();
      this.socketTask = null;
    }
  }

  /**
   * 注册消息接收回调
   */
  onMessage(callback) {
    this.onMessageCallback = callback;
  }
}
