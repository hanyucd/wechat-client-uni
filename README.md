# 移动端: uniapp-wechat（进行中...）

技术栈：Vue3 + Pinia + Vite + Axios + Scss + Pnpm + Husky + Eslint

次要：
- pinia-plugin-persistedstate 适用于 Pinia 的持久化存储插件
- unplugin-auto-import 按需自动导入 API

### 添加 ESLint 解析 *.nvue 文件

``` ts
// 添加 override 配置 .nvue 文件的解析（配置覆盖）
module.exports = {
  // ...
  overrides: [
    {
      files: ['*.nvue'],
      // parser: 'vue-eslint-parser', 无需重复配置 parser，因为就是vue语法
      rules: {
        'vue/comment-directive': 'off', // 忽略条件编译注释
        'vue/no-v-html': 'off' // nvue 不支持 v-html
      }
    }
  ]
}
```

### *.nvue 加载字体图标

``` ts
// App.vue
onLaunch(() => {
  // #ifdef APP-NVUE 
  const domModule = uni.requireNativePlugin('dom');
  domModule.addRule('fontFace', {
    'fontFamily': 'iconfont',
    'src': 'url(\'https://at.alicdn.com/t/font_1365296_2ijcbdrmsg.ttf\')'
  });
  // #endif
});
```
