import { defineStore } from 'pinia';
import type { IUser, TLoginParams } from '@/types/user';
import $api from '@/api';

export const useUserStore = defineStore('userModule', () => {
  const userInfo = ref<IUser>({} as IUser); // 用户信息

  // 用户 token 
  const userToken = computed(() => userInfo.value?.token || '');

  /**
   * 用户注册
   */
  const userRegisterAction = async (param: TLoginParams) => {
    try {
      // const resp = await $api.userRegisterApi(param);
      // userInfo.value = userLoginInfoRes.data;
      // _loginSuccess();
      console.log(param);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 用户登录
   */
  const userLoginAction = async (param: TLoginParams) => {
    try {
      const loginRes = await $api.userLoginApi(param);
      userInfo.value = loginRes.data!;
      // _loginSuccess();
      console.log(loginRes);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * 退出登录
   */
  const userLogoutAction = async () => {
    // 清除用户信息
    userInfo.value = {} as IUser;
    console.log('退出登录');

    // uni.redirectTo({ url: '/pages/login/index' });
  };

  return {
    userInfo,
    userToken,
    userRegisterAction,
    userLoginAction,
    userLogoutAction
  };
}, {
  persist: {
    key: 'vapp-user-store',
    paths: ['userInfo']
  }
});
