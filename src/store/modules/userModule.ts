import { defineStore } from 'pinia';
import type { IUser } from '@/types/user';
import $api from '@/api';

export const useUserStore = defineStore('userModule', () => {
  const userInfo = ref<IUser>({} as IUser); // 用户信息

  // 用户 token 
  const userToken = computed(() => userInfo.value?.token || '');

  /**
   * 用户名、密码登录
   */
  const userLoginAction = async (param: any) => {
    try {
      // const resp = await $api.userLoginApi(param);
      // 获取用户登录信息
      // const userLoginInfoRes = await $api.getUserLoginInfoApi({ username: param.userName, appType: 3 });
      // userInfo.value = userLoginInfoRes.data;
      // _loginSuccess();
      console.log(param);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    userInfo,
    userToken,
    userLoginAction
  };
}, {
  persist: {
    key: 'v-user-store',
    paths: ['userInfo']
  }
});
