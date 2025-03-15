import { defineStore } from 'pinia';

export const useAppStore = defineStore('appModule', () => {
  // 系统信息
  const systemInfo = ref(uni.getSystemInfoSync());

  return {
    systemInfo
  };
}, {
  persist: {
    key: 'wechat-app-store',
    pick: ['systemInfo'],
  }
});
