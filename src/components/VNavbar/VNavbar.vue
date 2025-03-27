<template>
  <view class="custom-navbar">
    <view class="custom-navbar-wrap" :class="{ 'fixed': fixed }" :style="{ 'background': bgColor }">
      <!-- 状态栏 -->
      <view class="statusbar-module" :style="{ height: `${ statusBarHeight }px` }" />

      <!-- 导航栏 -->
      <view class="navbar-module">
        <!-- 左边 -->
        <view class="navbar-left">
          <VIcon v-if="showBack" :icon="'\ue60d'" @click="handleBack" />
        </view>
  
        <!-- 中间 -->
        <view class="navbar-center" :style="{ width: `${ appStore.systemInfo.screenWidth - 20 }px` }">
          <slot>
            <text v-if="title" class="navbar-title">{{ title }}</text>
          </slot>
        </view>
        
        <!-- 右边 -->
        <view v-if="isShowRight" class="navbar-right">
          <slot name="right"></slot>
        </view>
      </view>
    </view>

    <!-- 占位 -->
    <view v-if="placeholder" :style="{ height: `${ statusBarHeight + 45 }px` }" />
  </view>
</template>

<script setup lang="ts">
import config from '@/config';
import { useAppStore } from '@/store';

interface Props {
  title?: string;
  fixed?: boolean;
  /** 固定在顶部时，是否生成一个等高元素，以防止塌陷 */
  placeholder?: boolean;
  /** 导航栏背景设置 */
  bgColor?: string;

  showBack?: boolean;
  isShowRight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: config.appName,
  fixed: true,
  placeholder: true,
  bgColor: '#F8F9FA',

  showBack: true,
  isShowRight: true,
});

const appStore = useAppStore();

// 状态栏高度
const statusBarHeight = ref(0);

onMounted(() => {
  _getSystemInfo();
  // console.log('appStore.systemInfo', appStore.systemInfo.screenWidth);
});

/**
 * 获取系统信息
 */
const _getSystemInfo = () => {
  // #ifdef APP-PLUS
  statusBarHeight.value = plus.navigator.getStatusbarHeight();
  // #endif

  // #ifndef APP-PLUS
  statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight!;
  // #endif
};

// 修改后的返回方法
const handleBack = () => {
  return uni.navigateBack({ delta: 1 });

  // console.log('开始返回');
  // uni.$uv.route({ type: 'back' });
  // console.log('返回了');
  // if (props.backEvent) {
  // }
  // emit('back');
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
