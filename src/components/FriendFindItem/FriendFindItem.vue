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
        <view class="action-wrap" @click="clickAction(findItem, findIndex)">
          <text class="iconfont action-icon">&#xe62a;</text>
        </view>
      </view>

      <!-- 点赞列表|评论列表 -->
      <view class="commment-module">
        <!-- 点赞 -->
        <view class="like-wrap">
          <text class="icon-like iconfont">&#xe637;</text>
          <view class="like-user">
            <text v-for="(lItem, lIndex) in 6" :key="lIndex" class="like-user-name">{{ '装修工' }}</text>
          </view>
        </view>
        <!-- 评论 -->
        <view class="comment-wrap">
          <text class="icon-comment iconfont">&#xe64e;</text>
          <view class="comment-list">
            <view v-for="(c, ci) in 3" :key="ci" class="comment-item">
              <text v-if="0" class="comment-user">{{ '张三' }}：</text>
              <view v-else class="comment-user-reply">
                <text class="comment-user">{{ '李四' }} </text>
                <text class="comment-reply">回复</text>
                <text class="comment-user">{{ '王五' }}：</text>
              </view>
              <text class="comment-content">{{ '长按图片显示操作菜单，如不填默认为保存相册' }}</text>
            </view>
          </view>
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

const emit = defineEmits<{
  action: [findItem: any, findIndex: number];
  reply: [value: string];
}>();

// 点击 ... 操作
const clickAction = (findItem: any, findIndex: number) => {  
  emit('action', findItem, findIndex);
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
