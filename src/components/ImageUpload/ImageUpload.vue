
<template>
  <view class="upload-module">
    <view v-for="(item, index) in imageList" :key="index" style="width: 230rpx;" class="image-item">
      <image :src="item" class="image" @click="previewImage(item)" />
      <!-- 移除 icon -->
      <view class="remove-icon-wrap" @click="removeImage(index)">
        <text class="remove-icon iconfont">&#xe620;</text>
      </view>
    </view>

    <!-- 上传 upload -->
    <view v-if="imageList.length < imgLimit" class="image-upload" @click="chooseImage">
      <view class="upload-wrap">
        <text class="icon-upload">+</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  imageList: string[];
}>();

const imgLimit = ref(9);

const emit = defineEmits<{
  updateImage: [images: string[]];
}>();

/**
 * 选择图片
 */
const chooseImage = async () => {
  try {
    const imgRes = await uni.chooseImage({ count: imgLimit.value - props.imageList.length });
    const tempFilePaths = imgRes.tempFilePaths;
    emit('updateImage', [...props.imageList, ...tempFilePaths]);
  } catch (error) {
    console.log(error);
  }
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
  const newImgList = [...props.imageList];
  newImgList.splice(index, 1);
  emit('updateImage', newImgList);
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
