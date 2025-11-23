
<template>
  <view class="upload-module">
    <view v-for="(item, index) in imageList" :key="index" style="width: 230rpx;" class="image-item">
      <image :src="item" class="image" @click="previewImage(item)" />
      
      <view class="remove-icon-wrap" @click="removeImage(index)">
        <text class="remove-icon iconfont">&#xe620;</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  imageList: string[];
}>();

/**
 * 选择图片
 */
const chooseImage = () => {
  uni.chooseImage({
    // count: 9,
    // sizeType: ['original', 'compressed'],
    // sourceType: ['album', 'camera'],
    // success: (res) => {
    //   const tempFilePaths = res.tempFilePaths;
    //   props.imageList.push(...tempFilePaths);
    // },
  });
};

/**
 * 预览图片
 */
const previewImage = (item: string) => {
  uni.previewImage({ current: item, urls: props.imageList });
};

/**
 * 移除图片
 */
const removeImage = (index: number) => {
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
