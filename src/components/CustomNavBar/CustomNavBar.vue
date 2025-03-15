<template>
  <view class="custom-navbar">
    <!-- 状态栏 -->
    <!-- <view :style="'height:'+statusBarHeight+'px'" /> -->
    <text class="text">导航栏</text>
  </view>
</template>

<script setup>
// 状态栏高度
const statusBarHeight = ref(0);
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
