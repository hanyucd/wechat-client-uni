<template>
  <VNavbar bgColor="#fff" title="好友申请列表" />

  <!-- 申请列表 -->
  <view class="apply-module">
    <VListItem
      v-for="item in applyList"
      :key="item.id"
      :title="item.user.nickname"
      :cover="item.user.avatar || '/static/images/userpic.png'"
      :showRightIcon="false"
      showRight
      @click="navToApplyHandleRoute(item)"
    >
      <template #right>
        <view class="apply-status">
          <view class="apply-status-text">
            <uv-text v-if="item.status === 'pending'" type="primary" text="去处理" />
            <uv-text v-else-if="item.status === 'agree'" type="success" text="已同意" />
            <uv-text v-else-if="item.status === 'refuse'" type="info" text="已拒绝" />
            <uv-text v-else-if="item.status === 'ignore'" type="info" text="已忽略" />
            <uv-text v-else-if="item.status === 'expire'" type="warning" text="已过期" />
          </view>
          <view class="apply-time">
            <uv-text type="info" size="10" :text="`申请时间: ${ item.created_at }`" />
          </view>
        </view>
      </template>
    </VListItem>
  </view>
</template>

<script setup lang="ts">
import type { IFriendApply } from '@/types/friend';
import $api from '@/api';

const applyList = ref<IFriendApply[]>([]); 
const page = ref(1); // 当前页数
const total = ref(0); // 总页数
const isNextLoading = ref(false); // 是否加载下一页

onLoad(() => {
  _getFriendApplyList();

  // 监听好友申请处理事件
  uni.$on('handleApplyEvt', (handleStatus: string) => {
    uni.$uv.toast(`已 ${ handleStatus }`);
    setTimeout(() => {
      _getFriendApplyList();
    }, 1000);
  });
});

onPullDownRefresh(() => {
  console.log('下拉刷新');
  _getFriendApplyList();
  uni.stopPullDownRefresh();
});

onReachBottom(() => {
  if (applyList.value.length >= total.value) return;
  _getFriendApplyList(++page.value);
});

/**
 * 获取好友申请列表
 */
const _getFriendApplyList = async (pageNum = 1) => {
  if (isNextLoading.value) return;
  isNextLoading.value = true;

  if (pageNum === 1) {
    uni.showLoading({ title: '加载中', mask: true });
    page.value = 1;
    applyList.value = [];
  }

  const param = { page: pageNum };
  
  try {
    const friendApplyRes = await $api.getFriendApplyListApi(param);
    const { list, total: totalCount } = friendApplyRes.data;

    applyList.value.push(...list);
    total.value = totalCount;
  } catch (error) {
    console.log(error);
  } finally {
    isNextLoading.value = false;
  }
};

/**
 * 导航到好友申请处理页面
 */
const navToApplyHandleRoute = (applyItem: IFriendApply) => {
  if (applyItem.status !== 'pending') return uni.$uv.toast('已处理，无法重复操作');
  uni.$uv.route('/pages/module-friend/friend-apply/friend-apply', { apply_id: applyItem.id });
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
