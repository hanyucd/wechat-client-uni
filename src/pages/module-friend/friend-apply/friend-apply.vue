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
    <!-- 发起申请 -->
    <uv-button v-if="friendId" :custom-style="{ backgroundColor: '#08C060', color: '#fff' }" text="点击添加" @click="submitFriendApply" />
    <!-- 申请处理 -->
    <uv-button v-else-if="friendApplyId" :custom-style="{ backgroundColor: '#08C060', color: '#fff' }" text="处理申请" @click="openApplyStatusPopup" />
  </view>

  <!-- 处理申请状态 picker -->
  <uv-picker
    ref="statusPickerRef"
    keyName="label"
    round="20"
    confirmColor="#08C060"
    :columns="statusPickerColumns"
    @confirm="onStatusPickerConfirm"
  />
</template>

<script setup lang="ts">
import $api from '@/api';
import { useUserStore } from '@/store';

const userStore = useUserStore();

// 好友 id
const friendId = ref(0);
// 好友申请 id
const friendApplyId = ref(0);

// 好友备注
const nickname = ref('');
// 不让他看我朋友圈
const isLookMe = ref(true);
// 不看他朋友圈
const isLookHim = ref(true);

const statusPickerRef = ref(null);
// 处理好友申请状态
const statusPickerColumns = ref([
  [
    { label: '同意', value: 'agree' },
    { label: '拒绝' , value: 'refuse' },
    { label: '忽略' , value: 'ignore' },
  ]
]);

onLoad((option: any) => {
  console.log(option);

  if (option.friend_id) {
    friendId.value = Number(option.friend_id);
  }

  if (option.apply_id) {
    friendApplyId.value = Number(option.apply_id);
  }
});

/**
 * 提交好友申请
 */
const submitFriendApply = async () => {
  const modalRes = await uni.showModal({ title: '提示', content: '确定添加好友吗？' });
  if (!modalRes.confirm) return;
  
  try {
    await $api.postFriendApplyApi({
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

/**
 * 打开处理申请状态弹窗
 */
const openApplyStatusPopup = () => {
  if (!friendApplyId.value) return uni.$uv.toast('无申请 id');
  (statusPickerRef.value as any).open();
};

/**
 * 处理好友申请
 */
const onStatusPickerConfirm = async (event: any) => {
  uni.showLoading({ title: '', mask: true });
  const applyStatus = event.value[0].value;

  try {
    await $api.postHandleFriendApplyApi(friendApplyId.value, {
      applyId: friendApplyId.value,
      nickname: nickname.value,
      lookme: isLookMe.value ? 1 : 0,
      lookhim: isLookHim.value ? 1 : 0,
      status: applyStatus,
    });

    uni.$uv.route({ type: 'back' });
    uni.$emit('handleApplyEvt', applyStatus);
    // 更新通讯录数据
    userStore.getContactListAction();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
