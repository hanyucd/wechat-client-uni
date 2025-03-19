<template>
  <view v-if="status" style="z-index:9999; overflow:hidden;">
    <!-- 蒙版 -->
    <view v-if="mask" class="popup-mask" :style="getMaskColor" @click="closeVPopup" />
    <!-- 弹出框内容 -->
    <view ref="popup" class="popup-body" :class="popupBodyClass" :style="[{ background: bodyBgColor }, popupCostomPosition]">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';

interface IPopup {
  /** 是否开启蒙版 */
  mask?: boolean;
  maskColor?: boolean;
  mode?: 'center' | 'bottom' | 'custom';
  bodyBgColor?: string;
  bodyWidth?: number;
  bodyHeight?: number;
}

const props = withDefaults(defineProps<IPopup>(), {
  mask: true,
  maskColor: true,
  mode: 'center',
  bodyBgColor: '#fff',
  // 弹出层内容宽度
  bodyWidth: 0,
  // 弹出层内容高度
  bodyHeight: 0,
});

const emit = defineEmits<{
  hide: [];
}>();

const appStore = useAppStore();

 // 是否显示 popup
const status = ref(false);
// 自定义位置 left px
const leftX = ref(-1);
// 自定义位置 top px
const topY = ref(-1);
const maxLeftX = ref(0);
const maxTopY = ref(0);

const getMaskColor = computed(() => {
  let i = props.maskColor ? 0.5 : 0;
  return `background-color: rgba(0,0,0,${ i });`; 
});

// popup 内容class
const popupBodyClass = computed(() => {
  let _popupBodyClass = '';
  if (props.mode === 'center') _popupBodyClass = 'popup-body-center';
  if (props.mode === 'bottom') _popupBodyClass = 'popup-body-bottom';
  if (props.mode === 'custom') _popupBodyClass = 'popup-body-custom';
  return _popupBodyClass;
});

// 自定义位置的情况下
const popupCostomPosition = computed(() => {
  return {
    left: (props.mode === 'custom' && leftX.value > -1) ? `${ leftX.value }px` : 'none',
    top: (props.mode === 'custom' && topY.value > -1) ? `${ topY.value }px` : 'none',
  };
});

onMounted(() => {
  // 计算弹窗: 最大 left x 和 top y
  const spacingPX = 10;
  // #ifdef APP
  maxLeftX.value = appStore.systemInfo.windowWidth - uni.upx2px(props.bodyWidth) - spacingPX;
  maxTopY.value = appStore.systemInfo.windowHeight - uni.upx2px(props.bodyHeight) - spacingPX;
  // #endif
  
  // #ifndef APP
  // @ts-ignore
  maxLeftX.value = appStore.systemInfo.windowWidth - uni.rpx2px(props.bodyWidth) - spacingPX;
  // @ts-ignore
  maxTopY.value = appStore.systemInfo.windowHeight - uni.rpx2px(props.bodyHeight) - spacingPX;
  // #endif
});

/**
 * 打开弹窗
 * @param _leftX
 * @param _topY 
 */
const openVPopup = (_leftX = 0, _topY = 0) => {
  if (status.value) return;

  if (props.mode === 'custom') {
    leftX.value = (_leftX > maxLeftX.value) ? maxLeftX.value : _leftX;
    topY.value = (_topY > maxTopY.value) ? maxTopY.value : _topY;
    // todo:
  }
  // console.log('弹窗坐标：', leftX.value, topY.value);

  status.value = true;
};

/**
 * 关闭弹窗
 */
const closeVPopup = () => {
  emit('hide');
  status.value = false;
};

defineExpose({
  openVPopup,
  closeVPopup
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
