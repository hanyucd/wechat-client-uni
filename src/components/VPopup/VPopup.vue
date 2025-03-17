<template>
  <view v-if="status" style="z-index:9999; overflow:hidden;">
    <!-- 蒙版 -->
    <view v-if="mask" class="popup-mask" :style="getMaskColor" @click="hideVPopup" />
    <!-- 弹出框内容 -->
    <view ref="popup" class="popup-view">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
interface IPopup {
  /** 是否开启蒙版 */
  mask?: boolean;
  maskColor?: boolean;
}

const props = withDefaults(defineProps<IPopup>(), {
  mask: true,
  maskColor: true
});

const emit = defineEmits<{
  hide: [];
}>();

 // 是否显示 popup
const status = ref(false);

const getMaskColor = computed(() => {
  let i = props.maskColor ? 0.5 : 0;
  return `background-color: rgba(0,0,0,${i});`; 
});

const showVPopup = () => {
  // emit('hide');
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
