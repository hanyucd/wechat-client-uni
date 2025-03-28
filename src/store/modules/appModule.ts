import { defineStore } from 'pinia';

export const useAppStore = defineStore('appModule', () => {
  // 系统信息
  const systemInfo = ref(uni.getSystemInfoSync());

  // 系统底部小黑条高度 px
  const sysSafeAreaHeight = computed(() => systemInfo.value.safeAreaInsets?.bottom || 0);

  return {
    systemInfo,
    sysSafeAreaHeight
  };
}, {
  persist: {
    key: 'wechat-app-store',
    paths: ['systemInfo']
  }
});
