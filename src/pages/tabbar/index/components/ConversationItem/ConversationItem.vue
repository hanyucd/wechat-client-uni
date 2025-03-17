<template>
  <view class="conversation-item" :class="{ 'conversation-item-top': 1 }" hover-class="bg-light">
    <div class="conversation-div" @click="onClick" @longpress="onLongpressEvt">
      <!-- 会话左侧 -->
      <view class="conversation-left">
        <VAvatar :src="conversation.avatar" :radius="10" />
        <VBadge
          :badge-style="{ position: 'absolute', top:'15rpx', right: '15rpx' }"
          :value="8"
        />
      </view>
  
      <!-- 会话右侧 -->
      <view class="conversation-right">
        <view class="conversation-info">
          <text class="conversation-name">{{ conversation.name }}</text>
          <text class="conversation-time">{{ timeUtil.gettime(conversation.update_time) }}</text>
        </view>
        <text class="conversation-content">{{ conversation.data }}</text>
      </view>
    </div>
  </view>
</template>

<script setup lang="ts">
import timeUtil from '@/utils/timeUtil';

interface IConversation {
  id?: number;
  avatar?: string;
  name?: string;
  update_time?: number;
  data?: string;
}

const props = defineProps<{
  conversation: IConversation;
  index: number;
}>();

const onClick = () => {
  console.log('onClick');
};

/**
 * 手指长按事件
 */
const onLongpressEvt = (event: any) => {
  console.log('onLongpressEvt', event);
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
