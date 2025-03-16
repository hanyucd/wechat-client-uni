<template>
  <!-- <uv-navbar title="个人中心" /> -->
  <CustomNavbar :placeholder="true" />

  <!-- <view style="height: 1000px; background: yellow" /> -->
  <text class="title">{{ title }}</text>
</template>

<script setup lang="ts">
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
