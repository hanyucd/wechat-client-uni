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
 * 图片加载完毕事件（保持宽高比的自适应缩放）
 */
const onImagLoadEvt = (event: any) => {
  const { width: realWidth, height: realHeight } = event.detail;
  // console.log('onImagLoadEvt', realWidth, realHeight);

  // 转换为像素单位的最大尺寸
  const maxWidthPX = _convertUnit(props.maxWidth);
  const maxHeightPX = _convertUnit(props.maxHeight);
  // console.log('max像素转换：', maxWidthPX, maxHeightPX);

  // 实际高度 < 最大高度
  if (realHeight < maxHeightPX) {
    imgHeight.value = realHeight;
    imgWidth.value = (realWidth <= maxWidthPX) ? realWidth : maxWidthPX;
  // 实际高度 >= 最大高度（需要缩放的情况）
  } else {
    imgHeight.value = maxHeightPX;
    const targetWidth = (realWidth / realHeight) * maxHeightPX;

    imgWidth.value = (targetWidth <= maxWidthPX) ? targetWidth : maxWidthPX;
  }
};

// 统一单位转换方法
const _convertUnit = (value: number) => {
   let _converUnitPx = 0;
    // #ifdef APP
    _converUnitPx = uni.upx2px(value);
    // #endif
    
    // @ts-ignore
    // #ifndef APP
    _converUnitPx = uni.rpx2px(value);
    // #endif
    return _converUnitPx;
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
