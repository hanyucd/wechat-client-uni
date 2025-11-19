<template>
  <view class="avatar-view">
    <image
      class="avatar-img"
      mode="aspectFill"
      :src="src ? src : '/static/images/userpic.png'"
      :style="sizeComputed"
      @click="clickEvent"
    />
  </view>
</template>

<script setup lang="ts">
interface IAvatar {
  src?: string;
  size?: number;
  radius?: number;
  clickType?: string;
}

const props = withDefaults(defineProps<IAvatar>(), {
  size: 90,
  radius: 0
});

const sizeComputed = computed(() => {
  return {
    width: `${ props.size }rpx`,
    height: `${ props.size }rpx`,
    borderRadius: `${ props.radius }rpx`
  };
});

const emit = defineEmits<{
  click: [];
}>();

const clickEvent = () => {
  emit('click');
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
