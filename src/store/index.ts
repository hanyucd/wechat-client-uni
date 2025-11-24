import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const pinia = createPinia();
// 使用持久化存储插件
pinia.use(createPersistedState({
  // 并全局设置存储在 uniStorage
  storage: {
    getItem: uni.getStorageSync,
    setItem: uni.setStorageSync
  }
}));

export default pinia;

// 模块统一导出
export * from './modules/appModule';
export * from './modules/userModule';
