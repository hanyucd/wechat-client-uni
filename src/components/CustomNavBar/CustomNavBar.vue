<template>
  <view class="custom-navbar">
    <!-- 状态栏 -->
    <view class="statusbar-module" :style="{ height: `${ statusBarHeight }px` }" />

    <!-- 导航栏 -->
    <view class="navbar-module">
      <!-- 左边 -->
      <view class="navbar-left">
        <text class="iconfont icon-back">{{ '\ue60d' }}</text>
      </view>

      <!-- 中间 -->
      <view class="navbar-center">
        <slot>
          <text v-if="title" class="navbar-title ml-3">{{ title }}</text>
        </slot>
      </view>
      
      <!-- 右边 -->
      <view v-if="isShowRight" class="navbar-right">
        右边
      </view>
    </view>
  </view>
</template>

<script setup>
// 状态栏高度
const statusBarHeight = ref(0);

const isShowRight = ref(true);

const title = ref('F微信');

// defineProps({  })

// withDefaults(defineProps({
//   isShowRight: {
//     type: Boolean,
//     default: true
//   }
// }));

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
  statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight;
  // #endif
};

// back(){
// 				if(this.backEvent){
// 					return uni.navigateBack({
// 						delta: 1
// 					});
// 				}
// 				this.$emit('back')
// 			},

// 修改后的返回方法
const handleBack = () => {
  // if (props.backEvent) {
  //   return uni.navigateBack({
  //     delta: 1
  //   });
  // }
  // emit('back');
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
