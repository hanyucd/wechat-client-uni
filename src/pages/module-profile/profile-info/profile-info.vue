<template>
  <VNavbar title="个人信息" bg-color="#fff" />

  <VListItem title="头像" showRight>
    <!-- <view class="user-info-wrap">
      <text class="user-name">{{ '艾伦-沃克' }}</text>
      <text class="user-wechat text-light-muted font mt-2">仿微信号：{{ 'hy-woke' }}</text>
    </view> -->

    <VAvatar :size="70" :src="'/static/images/userpic.png'" :radius="8" />
  </VListItem>

  <VListItem title="昵称" showRight>
    <template #right>
      <text class="iconfont icon-saosao">{{ '凤凰' }}</text>
    </template>
  </VListItem>

  <VListItem title="账号" showRight>
    <template #right>
      <text class="iconfont icon-saosao">{{ '1234566' }}</text>
    </template>
  </VListItem>

  <VListItem title="我的二维码" showRight>
    <template #right>
      <text class="iconfont font-md">&#xe647;</text>
    </template>
  </VListItem>
</template>

<script setup lang="ts">

</script>

<style>
/* #ifndef APP */
/* page {
  background: #EDEDED;
} */
/* #endif */
</style>

<style lang="scss" scoped>
@import './style.scss';
</style>
