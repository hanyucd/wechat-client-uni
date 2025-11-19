<template>
  <view class="find-div">
    <view class="find-left">
      <VAvatar :size="70" :radius="8" @click="navToUserMainPage" />
    </view>

    <view class="find-right">
      <view>右-1</view>
      <view>右-2</view>
      <view>右-3</view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 点击头像，进入用户主页
 */
const navToUserMainPage = () => {
  uni.$uv.route({ url: '/pages/module-common/user-mine/user-mine', params: { userId: 111 } });
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
