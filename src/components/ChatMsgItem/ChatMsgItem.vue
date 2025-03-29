<template>
  <div class="chat-div" @longpress="onlongpressEvt">
    <!-- 时间显示 -->
    <view v-if="chatTimeDisplayStatus(prevChatTime, chatItem.create_time)" class="chat-time-wrap">
      <text class="chat-time">{{ formatChatTime(chatItem.create_time) }}</text>
    </view>
    
    <!-- 聊天消息-右边 (别人) -->
    <view v-if="!isSelfUser" class="chat-right">
      <view class="user-avatar">
        <VAvatar :size="70" :src="chatItem.avatar" :radius="8" />
      </view>
      <view class="chat-msg-wrap">
        <!-- 文字 -->
        <view v-if="chatItem.type === 'text'" class="chat-text-wrap">
          <text class="chat-text">{{ chatItem.data }}</text>
        </view>
      </view>
    </view>

    <!-- 聊天消息-左边 (自己) -->
    <view v-else class="chat-left">
      <view class="user-avatar">
        <VAvatar :size="70" :src="chatItem.avatar" :radius="8" />
      </view>
      <view class="chat-msg-wrap">
        <!-- 文字 -->
        <view v-if="chatItem.type === 'text'" class="chat-text-wrap">
          <text class="chat-text">{{ chatItem.data }}</text>
        </view>
      </view>
    </view>
  </div>
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
}

const props = defineProps<{
  chatItem: IChatMsgItem;
  chatIndex?: number;
  prevChatTime: string;
}>();

// 是否是自己
const isSelfUser = computed(() => {
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
 * 进入聊天设置页面
 */
const onlongpressEvt = (event: any) =>{
  console.log('长按事件', event);
  // uni.$uv.route('/pages/module-chat/chat/chat', { name: 'uvui', age: 1 });
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
