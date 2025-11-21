<template>
  <view class="find-div">
    <view class="find-left">
      <VAvatar :size="70" :radius="8" @click="navToUserMainPage" />
    </view>

    <view class="find-right">
      <!-- 昵称 -->
      <text class="find-nickname">{{ '昵称' }}</text>

      <!-- 内容 -->
      <text class="find-content">{{ '指的是仅当元素滚动到页面之外时，元素会固定在页面窗口的顶部，达到吸顶效果/粘性定位（布局）' }}</text>

      <!-- 图片 -->
      <view class="find-images">
        <image v-if="0" class="single-image" src="@/static/images/illenium-1.jpg" mode="aspectFill" @click="previewImg('/static/images/illenium-1.jpg', ['/static/images/illenium-1.jpg'])" />

        <template v-else>
          <image
            v-for="(iItem, iIndex) in 5"
            :key="iIndex"
            class="multi-image"
            src="@/static/images/illenium-1.jpg"
            mode="aspectFill"
            @click="previewImg('/static/images/illenium-1.jpg', ['/static/images/illenium-1.jpg'])"
          />
        </template>
      </view>

      <!-- 视频 -->
      <view v-if="findItem.video" class="find-video">
        <video :src="findItem.video.src" :poster="findItem.video.poster" controls style="height: 300rpx; width: 500rpx;"></video>
      </view>

      <!-- 时间|操作 -->
      <view class="time-module">
        <text class="time-text">{{ '2020年10月10日' }}</text>
        <view class="action-wrap">
          <text class="iconfont action-icon">&#xe62a;</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { IFindItem } from '@/types/find';

const props = defineProps<{
  findItem: IFindItem;
  findIndex: number;
}>();

/**
 * 预览图片
 */
const previewImg = (curImgUrl: string, imgUrls: string[]) => {
  uni.previewImage({ current: curImgUrl, urls: imgUrls });
};

/**
 * 点击头像，进入用户主页
 */
const navToUserMainPage = () => {
  uni.$uv.route({ url: '/pages/module-common/user-mine/user-mine', params: { userId: 111 } });
};

</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
