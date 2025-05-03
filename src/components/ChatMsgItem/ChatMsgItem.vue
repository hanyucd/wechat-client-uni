<template>
  <view class="chat-div">
    <!-- 时间显示 -->
    <view v-if="chatTimeDisplayStatus(prevChatTime, chatItem.create_time)" class="chat-time-wrap">
      <text class="chat-time-text">{{ formatChatTime(chatItem.create_time) }}</text>
    </view>

    <!-- 撤回消息 -->
    <view v-if="chatItem.isremove" class="chat-revoke-wrap">
      <text class="chat-revoke-text">{{ isSelfComputed ? '你' : '对方' }}撤回了一条信息</text>
    </view>

    <!-- 聊天消息 -->
    <template v-else>
      <!-- 消息-右边 (别人) -->
      <view v-if="!isSelfComputed" class="chat-right">
        <view class="user-avatar">
          <VAvatar :size="70" :src="chatItem.avatar" :radius="8" />
        </view>
        <div class="chat-msg-wrap" @longpress="onChatDivLongpressEvt">
          <!-- 文字 -->
          <view v-if="chatItem.type === 'text'" class="chat-text-wrap">
            <text class="chat-text">{{ chatItem.data }}</text>
          </view>
          <!-- 图片 -->
          <view v-else-if="chatItem.type === 'image'" class="chat-image-wrap" @click.stop="previewImg(chatItem.data!, [chatItem.data!])">
            <!-- #ifdef MP-WEIXIN -->
            <uv-image :src="chatItem.data" width="300rpx" height="300rpx" :radius="5" />
            <!-- #endif -->

            <!-- #ifndef MP-WEIXIN -->
            <VImage :src="chatItem.data" :radius="5" :maxWidth="300" :maxHeight="450" />
            <!-- #endif -->
          </view>
          <!-- 音频 -->
          <view v-else-if="chatItem.type === 'audio'" class="chat-audio-wrap" @click.stop="changeAudioPlay(chatItem, chatIndex)">
            <text class="chat-audio-time">{{ chatItem.options!.time + '"' }}</text>
            <image class="chat-audio-img" :src="(chatAudioPlayIndex === chatIndex && audioPlayStatus === 1) ? '/static/audio/audio-play.gif' : '/static/audio/audio-stop.png'" />
          </view>
          <!-- 视频 -->
          <view v-else-if="chatItem.type === 'video'" class="chat-video-wrap" @click.stop="changeVideoPlay(chatItem, chatIndex)">
            <video :id="`chatVideo-${ chatIndex }`" class="chat-video" :src="chatItem.data" :show-center-play-btn="false" :direction="0" @fullscreenchange="onVideoFullscreenchangeEvt"></video>
            <view class="video-cover">
              <uv-image :src="chatItem.options!.poster" width="350rpx" height="300rpx" :radius="5" />
              <view class="video-play-btn">
                <uv-icon name="play-right-fill" color="#fff" size="34" />
              </view>
            </view>
          </view>
        </div>
      </view>
  
      <!-- 消息-左边 (自己) -->
      <view v-else class="chat-left">
        <view class="user-avatar">
          <VAvatar :size="70" :src="chatItem.avatar" :radius="8" />
        </view>
        <div class="chat-msg-wrap" @longpress="onChatDivLongpressEvt">
          <!-- 文字 -->
          <view v-if="chatItem.type === 'text'" class="chat-text-wrap">
            <text class="chat-text">{{ chatItem.data }}</text>
          </view>
          <!-- 图片 -->
          <view v-else-if="chatItem.type === 'image'" class="chat-image-wrap" @click.stop="previewImg(chatItem.data!, [chatItem.data!])">
            <!-- #ifdef MP-WEIXIN -->
            <uv-image :src="chatItem.data" width="300rpx" height="300rpx" :radius="5" />
            <!-- #endif -->

            <!-- #ifndef MP-WEIXIN -->
            <VImage :src="chatItem.data" :radius="5" :maxWidth="300" :maxHeight="450" />
            <!-- #endif -->
          </view>
          <!-- 音频 -->
          <view v-else-if="chatItem.type === 'audio'" class="chat-audio-wrap" @click.stop="changeAudioPlay(chatItem, chatIndex)">
            <image class="chat-audio-img" :src="(chatAudioPlayIndex === chatIndex && audioPlayStatus === 1) ? '/static/audio/audio-play.gif' : '/static/audio/audio-stop.png'" />
            <text class="chat-audio-time">{{ chatItem.options!.time + '"' }}</text>
          </view>
          <!-- 视频 -->
          <view v-else-if="chatItem.type === 'video'" class="chat-video-wrap" @click.stop="changeVideoPlay(chatItem, chatIndex)">
            <video :id="`chatVideo-${ chatIndex }`" class="chat-video" :src="chatItem.data" :show-center-play-btn="false" :direction="0" @fullscreenchange="onVideoFullscreenchangeEvt"></video>
            <view class="video-cover">
              <uv-image :src="chatItem.options!.poster" width="350rpx" height="300rpx" :radius="5" />
              <view class="video-play-btn">
                <uv-icon name="play-right-fill" color="#fff" size="34" />
              </view>
            </view>
          </view>
        </div>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { formatChatTime } from '@/utils/timeUtil';
import type { IChatMsgItem } from '@/types/chat';

const props = defineProps<{
  chatItem: IChatMsgItem;
  chatIndex: number;
  prevChatTime: string;
  chatAudioPlayIndex: number;
  audioPlayStatus: 0 | 1;
}>();

// 视频管理器
const videoManager = ref<UniApp.VideoContext | null>(null);

// 是否是自己
const isSelfComputed = computed(() => {
  return props.chatItem.from_user_id === 1;
});

// 聊天时间显示状态（5 分钟内不显示）
const chatTimeDisplayStatus = computed(() => {
  return (prevChatTime: string, curChatTime: string ) => {
    let _isShow = true;
    const fiveMinuTimestamp = 1000 * 60 * 5; // 5 分钟
    const prevCTimestamp = +new Date(parseInt(prevChatTime) * 1000);
    const curChatTimestamp = +new Date(parseInt(curChatTime) * 1000);

    ((curChatTimestamp - prevCTimestamp) <= fiveMinuTimestamp) && (_isShow = false);
    return _isShow;
  };
});

const emit = defineEmits<{
  longpress: [x: number, y: number, index: number];
  click: [];
  changeAudioEvt: [chatItem: IChatMsgItem, chatIndex: number];
}>();

/**
 * 预览图片
 */
const previewImg = (curImgUrl: string, imgUrls: string[]) => {
  uni.previewImage({ current: curImgUrl, urls: imgUrls });
};

/**
 * 切换语音-播放/停止
 */
const changeAudioPlay = (_chatItem: IChatMsgItem, _chatIndex: number) =>{
  emit('changeAudioEvt', _chatItem, _chatIndex);
};

/**
 * 切换视频-播放/停止
 */
const changeVideoPlay = (_chatItem: IChatMsgItem, _chatIndex: number) =>{
  videoManager.value = uni.createVideoContext(`chatVideo-${ _chatIndex }`);
  videoManager.value.play();
  videoManager.value.requestFullScreen();
};

/**
 * 当视频进入和退出全屏时触发
 */
const onVideoFullscreenchangeEvt = (event: any) => {
  console.log(event.detail);
  const { fullScreen } = event.detail;
  // @ts-ignore
  if (!fullScreen) videoManager.value.stop();
}; 

/**
 * 长按事件
 */
const onChatDivLongpressEvt = (event: any) => {
  // console.log('长按事件', event);
  let _leftX = 0;
  let _topY = 0;

  // #ifdef APP-NVUE
  if (Array.isArray(event.changedTouches) && event.changedTouches.length) {
    _leftX = event.changedTouches[0].screenX;
    _topY = event.changedTouches[0].screenY;
  }
  // #endif

  // #ifdef WEB
  _leftX = event.changedTouches[0].pageX;
  _topY = event.changedTouches[0].pageY;
  // #endif

  // #ifdef MP
  _leftX = event.detail.x;
  _topY = event.detail.y;
  // #endif

  emit('longpress', _leftX, _topY, props.chatIndex);
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
