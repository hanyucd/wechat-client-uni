import { defineStore } from 'pinia';
import $api from '@/api';
import WsClient from '@/utils/webSocketUtil';
import type { IUser, TLoginParams, TRegisterParams } from '@/types/user';
import type { IContact } from '@/types/friend';

export const useUserStore = defineStore('userModule', () => {
  // webSocket URL地址
  const wsURL = ref(import.meta.env.VITE_SOCKET_URL);
  // webSocket 客户端
  const wsClient = ref<WsClient | null>(null);
  // const wsClient = ref<WsClient>(new WsClient({ url: wsURL.value, }));

  // 用户信息
  const userInfo = ref<IUser>({} as IUser);
  // 待处理好友申请数量
  const pendingFriendApplyCount = ref(0);
  // 好友列表（通讯录）
  const userContact = ref<IContact>({} as IContact);

  // 用户 token 
  const userToken = computed(() => userInfo.value?.token || '');

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
  const initAppAction = async () => {
    console.log('初始化 app 执行 action');
    if (!userToken.value) return;

    // initWebSocketAction();
    getFriendApplyPendingCountAction();
    getContactListAction();
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
   * 获取好友申请待处理数量
   */
  const getFriendApplyPendingCountAction = async () => {
    try {
      const friendApplyRes = await $api.getPendingFriendApplyCountApi();
      pendingFriendApplyCount.value = friendApplyRes.data.count ?? 0;
      setContactTabBarBadgeAction();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 获取好友列表（通讯录）
   */
  const getContactListAction = async () => {
    try {
      const contactRes = await $api.getContactListApi();
      console.log(contactRes);
      userContact.value = contactRes.data ?? {} as IContact;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 设置联系人 tab 栏的好友申请数量
   */
  const setContactTabBarBadgeAction = () => {
    const count = pendingFriendApplyCount.value > 99 ? '99+' : pendingFriendApplyCount.value.toString();
    // uni.setTabBarBadge({ index: 1, text: count });
  };

  return {
    wsURL,
    wsClient,
    userInfo,
    userToken,
    userContact,
    pendingFriendApplyCount,
    userRegisterAction,
    userLoginAction,
    userLogoutAction,
    initAppAction,
    initWebSocketAction,
    getContactListAction,
  };
}, {
  persist: {
    key: 'vapp-user-store',
    paths: ['userInfo']
  }
});
