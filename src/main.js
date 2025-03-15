import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import uvUI from '@climblee/uv-ui';
import * as Pinia from 'pinia';
import pinia from './store';

export function createApp() {
  const app = createSSRApp(App);
  
  app.use(uvUI);
  app.use(router);
  app.use(pinia);
  
  return {
    app,
    Pinia
  };
}

// console.log(uni.$uv);
