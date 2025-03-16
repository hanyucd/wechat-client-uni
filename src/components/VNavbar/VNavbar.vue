<template>
  <view class="custom-navbar">
    <view class="custom-navbar-wrap" :class="{ 'fixed': fixed }" :style="{ 'background': bgColor }">
      <!-- 状态栏 -->
      <view class="statusbar-module" :style="{ height: `${ statusBarHeight }px` }" />

      <!-- 导航栏 -->
      <view class="navbar-module" style="height: 45px">
        <!-- 左边 -->
        <view class="navbar-left">
          <text class="iconfont icon-back">{{ '\ue60d' }}</text>
        </view>
  
        <!-- 中间 -->
        <view class="navbar-center">
          <slot>
            <text v-if="title" class="navbar-title">{{ title }}</text>
          </slot>
        </view>
        
        <!-- 右边 -->
        <view v-if="isShowRight" class="navbar-right">
          右边
        </view>
      </view>
    </view>

    <!-- 占位 -->
    <view v-if="placeholder" :style="{ height: `${ statusBarHeight + 45 }px` }" />
  </view>
</template>

<script setup lang="ts">
import config from '@/config';

interface Props {
  title?: string;
  fixed?: boolean;
  /** 固定在顶部时，是否生成一个等高元素，以防止塌陷 */
  placeholder?: boolean;
  /** 导航栏背景设置 */
  bgColor?: string;

  isShowRight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: config.appName,
  fixed: true,
  placeholder: true,
  bgColor: '#F8F9FA',

  isShowRight: true,
});

// 状态栏高度
const statusBarHeight = ref(0);

onMounted(() => {
  _getSystemInfo();
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
// const handleBack = () => {
  // if (props.backEvent) {
  //   return uni.navigateBack({
  //     delta: 1
  //   });
  // }
  // emit('back');
// };
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
