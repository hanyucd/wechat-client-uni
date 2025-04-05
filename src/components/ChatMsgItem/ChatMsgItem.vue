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
          <view v-else-if="chatItem.type === 'image'" class="chat-image" @click="previewImg(chatItem.data!, [chatItem.data!])">
            <!-- <uv-image :src="chatItem.data" width="140px" height="140px" radius="5px" /> -->
            <VImage :src="chatItem.data" :radius="5" :maxWidth="300" :maxHeight="450" />
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
          <view v-else-if="chatItem.type === 'image'" class="chat-image" @click="previewImg(chatItem.data!, [chatItem.data!])">
            <VImage :src="chatItem.data" :radius="5" :maxWidth="300" :maxHeight="450" />
          </view>
        </div>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { formatChatTime } from '@/utils/timeUtil';

interface IChatMsgItem {
  from_user_id?: number;
  avatar?: string;
  nickname?: string;
  data?: string;
  type?: string;
  create_time: string;
  isremove: boolean;
}

const props = defineProps<{
  chatItem: IChatMsgItem;
  chatIndex: number;
  prevChatTime: string;
}>();

// 是否是自己
const isSelfComputed = computed(() => {
  return props.chatItem.from_user_id === 1;
});

// 计算聊天时间-显隐状态 | 大于 5 分钟显示，小于 5 分钟不显示
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
}>();

/**
 * 预览图片
 */
const previewImg = (curImgUrl: string, imgUrls: string[]) => {
  uni.previewImage({ current: curImgUrl, urls: imgUrls });
};

/**
 * 长按事件
 */
const onChatDivLongpressEvt = (event: any) =>{
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
