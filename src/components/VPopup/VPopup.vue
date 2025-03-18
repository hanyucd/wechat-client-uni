<template>
  <view v-if="status" style="z-index:9999; overflow:hidden;">
    <!-- 蒙版 -->
    <view v-if="mask" class="popup-mask" :style="getMaskColor" @click="hideVPopup" />
    <!-- 弹出框内容 -->
    <view ref="popup" class="popup-body" :clas="popupBodyClass" :style="{ background: bodyBgColor }">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
interface IPopup {
  /** 是否开启蒙版 */
  mask?: boolean;
  maskColor?: boolean;
  mode?: 'center' | 'bottom' | 'custom';
  bodyBgColor?: string;
}

const props = withDefaults(defineProps<IPopup>(), {
  mask: true,
  maskColor: true,
  mode: 'center',
  bodyBgColor: '#fff',
});

const emit = defineEmits<{
  hide: [];
}>();

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

// popup 内容样式
const popupBodyClass = computed(() => {
  let _popupBodyClass = '';
  if (props.mode === 'center') _popupBodyClass = 'popup-body-center';
  if (props.mode === 'bottom') _popupBodyClass = 'popup-body-bottom';
  return _popupBodyClass;
});

const showVPopup = (_leftX = 0, _topY = 0) => {
  // emit('hide');
  if (status.value) return;

  if (props.mode === 'custom') {
    // todo:
  }

  leftX.value = (_leftX > maxLeftX.value) ? maxLeftX.value : _leftX;
  topY.value = (_topY > maxTopY.value) ? maxTopY.value : _topY;

  status.value = true;
};

const hideVPopup = () => {
  emit('hide');
  status.value = false;
};

defineExpose({
  showVPopup,
  hideVPopup
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
