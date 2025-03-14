import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';

export function createApp() {
  const app = createSSRApp(App);
  
  // #ifndef APP-NVUE
  app.use(router);
  // #endif
  
  return {
    app,
  };
}
