<template>
  <!-- <uv-navbar title="个人中心" /> -->
  <VNavbar title="首页">
    <template #right>
      <view class="right-icons">
        <VIcon :icon="'\ue6e3'" :icon-style="{ marginRight: '40rpx' }" />
        <VIcon :icon="'\ue682'" @click="openExtendPopup" />
      </view>
    </template>
  </VNavbar>

  <text class="title">{{ title }}</text>

  <!-- 会话列表 -->
  <template v-for="(item, index) in conversationList" :key="item.id">
    <ConversationItem :index="index" :conversation="item" />
  </template>
</template>

<script setup lang="ts">
import ConversationItem from './components/ConversationItem/ConversationItem.vue';
import { useAppStore } from '@/store';

const appStore = useAppStore();
const title = ref('H5端');

const conversationList = ref([
  { id: 1, name: '张三', avatar: 'http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/67d13e1103efc.jpg', update_time: 1742139046,  data: '你好，我是张三' },
  { id: 2, name: '李四', avatar: 'http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/67d13e1103efc.jpg', update_time: 1567695767,  data: '你好，我是李四' },
  { id: 3, name: '李四', avatar: 'http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/67d13e1103efc.jpg', update_time: 1567695767,  data: '你好，我是李四' },
  { id: 4, name: '李四', avatar: 'http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/67d13e1103efc.jpg', update_time: 1567695767,  data: '你好，我是李四' },
]);
onLoad(() => {
  console.log('vue页面加载完成:', appStore.systemInfo);
});

const openExtendPopup = () => {
  console.log('打开扩展弹窗');
  // 打开扩展弹窗
  // appStore.openExtendPopup();
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
