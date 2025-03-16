<template>
  <view class="conversation-item" @click="onClick" @longpress="long">
    <!-- 会话左侧 -->
    <view class="conversation-left">
      <!-- <image :srcc="conversation.avatar" mode="aspectFill" style="width: 92rpx; height: 92rpx;" /> -->
      <Avatar :src="conversation.avatar" :radius="10" />
      <!-- <free-badge v-if="item.noreadnum" badge-class="position-absolute" badge-style="top:15rpx;right:15rpx" :value="item.noreadnum" /> -->
    </view>

    <!-- 会话右侧 -->
    <view class="conversation-right">
      <view class="conversation-info">
        <text class="conversation-name">{{ conversation.name }}</text>
        <!-- <text class="conversation-time">{{ conversation.update_time }}</text> -->
        <text class="conversation-time">{{ timeUtil.gettime(conversation.update_time) }}</text>
      </view>
      <text class="conversation-content">{{ conversation.data }}</text>
    </view>
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

const long = () => {
  console.log('onLong');
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
