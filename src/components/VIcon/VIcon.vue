<template>
  <view class="icon-view" :style="iconStyle" @click="onClickEvent">
    <text class="iconfont icon-text" :style="{ fontSize: `${ size }rpx` }">{{ icon }}</text>
  </view>
</template>

<script setup lang="ts">
interface IIcon {
  icon?: string;
  size?: number;
  iconStyle?: object;
}

const props = withDefaults(defineProps<IIcon>(), {
  size: 35,
  icon: '',
});

const emit = defineEmits<{
  click: [];
}>();

const onClickEvent = () => {
  emit('click');
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
