<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch');
  
  // 加载公共图标库
  // #ifdef APP
  const domModule = uni.requireNativePlugin('dom');
  domModule.addRule('fontFace', {
    'fontFamily': 'iconfont',
    'src': 'url(\'/static/font.ttf\')'
    // 'src': 'url(\'https://at.alicdn.com/t/font_1365296_2ijcbdrmsg.ttf\')'
  });
  // #endif
});

onShow(() => {
  // console.log('App Show');
});

onHide(() => {
  // console.log('App Hide');
});
</script>

<style lang="scss">
/*每个页面公共css */
@import "./styles/common.scss";

/* #ifndef APP */
@import "./styles/iconfont.scss";
/* #endif */
</style>
