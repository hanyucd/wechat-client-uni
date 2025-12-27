
export default class WebSocketClient {
  url: string;

  constructor(options: any = {}) {
    this.url = options.url || ''; // WebSocket 地址

  }
}
