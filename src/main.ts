import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
// @ts-ignore
import uvUI from '@climblee/uv-ui';

export function createApp() {
  const app = createSSRApp(App);
  
  app.use(uvUI);
  app.use(router); // 注：uni-mini-router 暂不支持 nvue，虽然引用了但项目未使用
  app.use(pinia);
  
  return {
    app,
  };
}

// console.log(uni.$uv);
console.log('当前环境:', import.meta.env);

