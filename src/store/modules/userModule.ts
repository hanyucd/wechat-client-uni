import { defineStore } from 'pinia';
import type { IUser, TLoginParams, IRegisterParams } from '@/types/user';
import $api from '@/api';

export const useUserStore = defineStore('userModule', () => {
  const userInfo = ref<IUser>({} as IUser); // 用户信息

  // 用户 token 
  const userToken = computed(() => userInfo.value?.token || '');

  /**
   * 用户注册
   */
  const userRegisterAction = async (param: IRegisterParams) => {
    try {
      const resp = await $api.userRegisterApi(param);
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
      _loginSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 登录成功后的处理
   */
  const _loginSuccess = () => {
    uni.$uv.toast('登录成功');
    uni.$uv.route({ type: 'tab', url: 'pages/tabbar/index/index' });
  };

  /**
   * 退出登录
   */
  const userLogoutAction = async () => {
    try {
      // 清除用户信息
      await $api.userLogoutApi();
      userInfo.value = {} as IUser;
      uni.$uv.route({ type: 'launch', url: 'pages/login/login' });
    } catch (error) {
      console.log(error);
    }
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
