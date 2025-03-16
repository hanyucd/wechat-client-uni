import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as Pinia from 'pinia';
import pinia from './store';
// @ts-ignore
import uvUI from '@climblee/uv-ui';

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
