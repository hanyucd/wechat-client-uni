import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import uvUI from '@climblee/uv-ui';

export function createApp() {
  const app = createSSRApp(App);
  
  // #ifndef APP-NVUE
  // #endif
  app.use(uvUI);
  app.use(router);
  
  return {
    app,
  };
}

// console.log(uni.$uv);
