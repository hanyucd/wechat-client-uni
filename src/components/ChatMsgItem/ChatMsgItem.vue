<template>
  <div class="chat-div" @longpress="onlongpressEvt">
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
interface IChatMsgItem {
  from_user_id?: number;
  avatar?: string;
  nickname?: string;
  data?: string;
  type?: string;
}

const props = defineProps<{
  chatItem: IChatMsgItem;
  index?: number;
}>();

// 是否是自己
const isSelfUser = computed(() => {
  return props.chatItem.from_user_id === 1;
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
