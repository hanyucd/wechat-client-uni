<template>
  <view class="flex">
    <!-- <image class="logo" src="/static/logo.png" /> -->
    <!-- <view class="text-area">
    </view> -->
    <view class="flex-1 bg-danger" style="height: 200rpx">1</view>
    <view class="flex-1 bg-success" style="height: 200rpx">2</view>
  </view>

  <text class="title">{{ title }}</text>
  <text>{{ title }}</text>
</template>

<script setup>
const title = ref('wechat 学习-网页');

onLoad(() => {
  console.log('页面加载完成');
});
</script>

<style lang="scss" scoped>
.title {
  color: $main-text-color;
}
</style>
