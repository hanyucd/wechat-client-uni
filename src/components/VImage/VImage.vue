<template>
  <image
    class="v-image bg-hover-light"
    lazy-load
    mode="aspectFill"
    :src="src"
    :style="sizeComputed"
    @click="onClickEvent"
    @longpress="onLongpressEvt"
    @load="onImagLoadEvt"
  />
</template>

<script setup lang="ts">
interface IImage {
  src?: string;
  radius?: number;
  maxWidth?: number;
  maxHeight?: number;
}

const props = withDefaults(defineProps<IImage>(), {
  src: '',
  radius: 0,
  // rpx
  maxWidth: 500,
  maxHeight: 500,
});

// 定义图片宽度响应式变量，初始值100 px
const imgWidth = ref(100);
 // 定义高度/宽度响应式变量，初始值100
const imgHeight = ref(100);

const sizeComputed = computed(() => {
  return {
    width: `${ imgWidth.value }px`,
    height: `${ imgHeight.value }px`,
    borderRadius: `${ props.radius }rpx`
  };
});

/**
 * 图片加载完毕事件
 */
const onImagLoadEvt = (event: any) => {
  const { realWidth, realHeight } = event.detail;
  console.log('onImagLoadEvt', realWidth, realHeight);

  let maxWidthPX = 0; // 最大宽度 px
  let maxHeightPX = 0; // 最大高度 px
  // #ifdef APP
  maxWidthPX = uni.upx2px(props.maxWidth);
  maxHeightPX = uni.upx2px(props.maxHeight);
  // #endif

  // #ifndef APP
  // @ts-ignore
  maxWidthPX = uni.rpx2px(props.maxWidth);
  // @ts-ignore
  maxHeightPX = uni.rpx2px(props.maxHeight);
  // #endif

  // 实际高度 < 最大高度
  if (realHeight < maxHeightPX) {
    imgHeight.value = realHeight;
    imgWidth.value = (realWidth <= maxWidthPX) ? realWidth : maxWidthPX;
  // 实际高度 >= 最大高度
  } else {
    imgHeight.value = maxHeightPX;
    const imgRatioWidth = (realWidth / realHeight) * maxHeightPX;

    imgWidth.value = (imgRatioWidth <= maxWidthPX) ? imgRatioWidth : maxWidthPX;
  }
};

const emit = defineEmits<{
  click: [];
  longpress: [];
}>();

const onClickEvent = () => {
  emit('click');
};

const onLongpressEvt = (event: any) => {
  emit('longpress');
 };
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
