<template>
  <view class="badge-view" :style="badgeStyle">
    <text class="badge-text">{{ value }}</text>
  </view>
</template>

<script setup lang="ts">
interface IAvatar {
  badgeStyle?: object;
  value?: number | string;
}

const props = withDefaults(defineProps<IAvatar>(), {
  value: '',
});

const clickEvent = () => {
  console.log('onClick');
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
