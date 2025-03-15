# 移动端: uniapp-wechat（进行中...）

技术栈：Vue3 + Pinia + Vite + Uv-ui + Scss + Pnpm + Husky + Eslint

次要：
- pinia-plugin-persistedstate 适用于 Pinia 的持久化存储插件
- unplugin-auto-import 按需自动导入 API

### nvue开发与vue开发的常见区别
[uniapp官方说明](https://uniapp.dcloud.net.cn/tutorial/nvue-outline.html#nvue%E5%BC%80%E5%8F%91%E4%B8%8Evue%E5%BC%80%E5%8F%91%E7%9A%84%E5%B8%B8%E8%A7%81%E5%8C%BA%E5%88%AB)

### 开发 nvue 页面

- nvue 页面结构同 vue, 由 template、style、script 构成

- template： 模板写法、数据绑定同 vue。组件支持 2 种模式，
  - weex 组件，同 weex 写法，参考：weex 内置组件；
  - uni-app 组件，同 uni-app 写法。
  - App 端 nvue 专用组件，详见https://uniapp.dcloud.io/component/barcode

- style：由于采用原生渲染，并非所有浏览器的 css 均支持，布局模型只支持 flex 布局，虽然不会造成某些界面布局无法实现，但写法要注意。详见：样式

- script：写法同 vue，并支持 3 种 API：
  - nvue API ：仅支持 App 端，uni-app 编译模式也可使用。使用前需先引入对应模块，参考：[模块引入 API](https://uniapp.dcloud.net.cn/tutorial/nvue-api.html)
  - uni API：https://uniapp.dcloud.io/api/README
  - plus API：仅支持 App 端。http://www.html5plus.org/doc/h5p.html

uni-app App 端内置 HTML5+ 引擎，让 js 可以 **直接调用** HTML5 Plus丰富的原生能力

HTML5 Plus移动App，简称5+App，是一种基于HTML、JS、CSS编写的运行于手机端的App，这种App可以通过扩展的JS API任意调用手机的原生能力，实现与原生App同样强大的功能和性能：

- 原生的api多达40万，HTML5 Plus的封装并非把40万api都封装了一遍，而是分成了2个层面：

1. HTML5Plus规范：**常用的扩展能力**，比如二维码、语音输入，都封装到了规范中，同时实现了Android和iOS的解析引擎，使得开发者的代码编写一次，可跨平台运行

2. Native.js是另一项创新技术。手机OS的原生API有四十多万，大量的API无法被HTML5使用。Native.js把几十万原生API映射成了js对象，通过js可以直接调ios和android的原生API。这部分就不再跨平台，写法分别是plus.ios和plus.android，比如调ios game center，或在android手机桌面创建快捷方式，这些都是 **平台专有** 的api。



### ios真机运行、打包所需要的证书申请（**注意：需要付费Apple账号才能申请证书**）
[iOS证书(.p12)和描述文件(.mobileprovision)申请](https://ask.dcloud.net.cn/article/152)
[苹果个人付费开发者证书申请及使用图文详解](https://cloud.tencent.com/developer/article/1863935)

- **主要是申请: AppId、证书、描述文件**

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

### nvue 加载字体图标

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
