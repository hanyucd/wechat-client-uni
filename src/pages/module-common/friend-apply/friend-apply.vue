<template>
  <VNavbar bgColor="#fff" title="好友申请" />

  <!-- 备注名 -->
  <view class="remark-module">
    <text class="remark-title">备注名</text>
    <input v-model="nickname" class="remark-input" type="text" placeholder="请填写备注名" style="height: 100rpx;" />
  </view>

  <VDivider />

  <VListItem title="不让他看我" :showLeftIcon="false" showRight :showRightIcon="false">
    <template #right>
      <uv-switch v-model="isLookMe" activeColor="#08C060" />
    </template>
  </VListItem>

  <VListItem title="不看他" :showLeftIcon="false" showRight :showRightIcon="false">
    <template #right>
      <uv-switch v-model="isLookHim" activeColor="#08C060" />
    </template>
  </VListItem>

  <view class="set-module">
    <uv-button :custom-style="{ backgroundColor: '#08C060', color: '#fff' }" text="点击添加" @click="submitFriendApply" />
  </view>
</template>

<script setup lang="ts">
import $api from '@/api';

// 好友 id
const friendId = ref(0);
// 好友申请 id
const friendApplyId = ref(0);

// 好友备注
const nickname = ref('');
// 不让他看我朋友圈
const isLookMe = ref(false);
// 不看他朋友圈
const isLookHim = ref(false);

onLoad((option: any) => {
  console.log(option);

  if (option.friend_id) {
    friendId.value = Number(option.friend_id);
  }
});

/**
 * 提交好友申请
 */
const submitFriendApply = async () => {
  const modalRes = await uni.showModal({ title: '提示', content: '确定添加好友吗？' });
  if (!modalRes.confirm) return;
  
  try {
    const res = await $api.postFriendApplyApi({
      friend_id: friendId.value,
      nickname: nickname.value,
      lookme: isLookMe.value ? 1 : 0,
      lookhim: isLookHim.value ? 1 : 0,
    });

    uni.$uv.toast('申请成功，等待好友确认');
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
