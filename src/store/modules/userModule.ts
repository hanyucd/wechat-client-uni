import { defineStore } from 'pinia';
import $api from '@/api';
import WsClient from '@/utils/webSocketUtil';
import type { IUser, TLoginParams, TRegisterParams } from '@/types/user';
import type { IFriendApply } from '@/types/friend';

export const useUserStore = defineStore('userModule', () => {
  // webSocket URL地址
  const wsURL = ref(import.meta.env.VITE_SOCKET_URL);
  // webSocket 客户端
  const wsClient = ref<WsClient | null>(null);
  // const wsClient = ref<WsClient>(new WsClient({ url: wsURL.value, }));

  // 用户信息
  const userInfo = ref<IUser>({} as IUser);
  // 好友申请列表
  const friendApplyList = ref<IFriendApply[]>([]);

  // 用户 token 
  const userToken = computed(() => userInfo.value?.token || '');
  // 待处理好友申请数量
  const pendingFriendApplyCount = computed(() => {
    return friendApplyList.value.filter(item => item.status === 'pending').length;
  });

  /**
   * 用户注册
   */
  const userRegisterAction = async (param: TRegisterParams) => {
    try {
      const regRes = await $api.userRegisterApi(param);
      uni.$uv.toast('注册成功');
      return regRes.data;
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

    initWebSocketAction();
  };

  /**
   * 退出登录
   */
  const userLogoutAction = async () => {
    try {
      // 清除用户信息
      await $api.userLogoutApi();
      userInfo.value = {} as IUser;
      uni.$uv.toast('已退出登录');
      uni.$uv.route({ type: 'launch', url: 'pages/login/login' });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 初始化应用启动时的操作
   */
  const initAppLaunchAction = async () => {
    console.log('初始化 app 执行 action');
    if (!userToken.value) return;

    // initWebSocketAction();
    getFriendApplyAction();
  };

  /**
   * 初始化 websocket 连接
   */
  const initWebSocketAction = async () => {
    try {
      wsClient.value = new WsClient({
        url: wsURL.value,
      });

      wsClient.value.connect();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 获取好友申请列表
   */
  const getFriendApplyAction = async (param?: IPageParams) => {
    try {
      const friendApplyRes = await $api.getFriendApplyListApi(param);
      friendApplyList.value = friendApplyRes.data.list;

      setContactTabBarBadgeAction();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 设置联系人 tab 栏的好友申请数量
   */
  const setContactTabBarBadgeAction = () => {
    const count = pendingFriendApplyCount.value > 99 ? '99+' : pendingFriendApplyCount.value.toString();
    console.log('tab 数标', count);
    // uni.setTabBarBadge({ index: 1, text: count });
    // uni.setTabBarBadge({ index: 0, text: '11' });
  };

  return {
    wsURL,
    wsClient,
    userInfo,
    userToken,
    friendApplyList,
    pendingFriendApplyCount,
    userRegisterAction,
    userLoginAction,
    userLogoutAction,
    initAppLaunchAction,
    initWebSocketAction
  };
}, {
  persist: {
    key: 'vapp-user-store',
    paths: ['userInfo']
  }
});
