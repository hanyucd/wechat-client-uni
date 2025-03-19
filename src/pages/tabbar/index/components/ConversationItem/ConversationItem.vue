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
import type { NumberBoxEvents } from '@ttou/uv-typings/types/numberBox';

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

const emit = defineEmits<{
  longpress: [x: number, y: number, index: number];
}>();

const onClick = () => {
  console.log('onClick');
};

/**
 * 手指长按事件
 */
const onLongpressEvt = (event: any) => {
  // console.log('onLongpressEvt', event);
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

  emit('longpress', _leftX, _topY, props.index);
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
