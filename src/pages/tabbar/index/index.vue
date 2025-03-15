<template>
  <uv-navbar title="个人中心" placeholder />

  <view class="flex">
    <view class="flex-1 bg-danger" style="height: 200rpx">1</view>
    <view class="flex-1 bg-success" style="height: 200rpx">2</view>
  </view>

  <text class="title">{{ title }}</text>
</template>

<script setup>
import { useAppStore } from '@/store';

const appStore = useAppStore();
const title = ref('wechat 学习-网页');

onLoad(() => {
  console.log('vue页面加载完成:', appStore.systemInfo);
});
</script>

<style lang="scss" scoped>
.title {
  color: $main-text-color;
}
</style>
