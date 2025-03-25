<template>
  <view class="list-item-view" hover-class="bg-light" @click="onClickEvent">
    <view v-if="showLeftIcon" class="list-item-left">
      <slot name="icon"></slot>
      <image v-if="cover" :src="cover" mode="widthFix" :style="coverSizeStyle" />
    </view>

    <view class="list-item-right" :class="border ? 'border-bottom' : ''">
      <slot>
        <text class="list-item-title">{{ title }}</text>
      </slot>
      <view v-if="showRight" class="list-item-right-wrap ">
        <slot name="right">右边插槽</slot>
        <text v-if="showRightIcon" class="arrow-right iconfont font-md">&#xe60c;</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface IListItem {
  cover?: string;
  title?: string;
  showLeftIcon?: boolean;
  showRight?: boolean;
  coverSize?: number;
  border?: boolean;
  showRightIcon?: boolean;
}

const props = withDefaults(defineProps<IListItem>(), {
  cover: '',
  title: '',
  showLeftIcon: true,
  border: true,
  coverSize: 75,
  showRight: true,
  showRightIcon: true,
});

const coverSizeStyle = computed(() => {
  return {
    width: `${ props.coverSize }rpx`,
    height: `${ props.coverSize }rpx`,
  };
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
