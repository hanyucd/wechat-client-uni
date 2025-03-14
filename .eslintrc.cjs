module.exports = {
  root: true, // 当前配置为根配置，将不再从上级文件夹查找配置 
  // 环境定义了预定义的全局变量
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  // 指定全局变量
  globals: {
    wx: true,
    uni: true,
    weex: true,
    plus: true,
    getApp: true,
    getCurrentPages: true,
    Component: true,
  },
  // parser 是 ESLint 配置文件的顶级选项，用于指定整个 ESLint 配置使用的解析器。这是设置解析器的主要方式
  parser: 'vue-eslint-parser',
  // 解析器选项
  parserOptions: {
    ecmaVersion: 'latest', // JavaScript 语言选项 es*@babel/eslint-parser
    sourceType: 'module',
    // extraFileExtensions: ['.vue', '.nvue'] // 声明扩展名
  },
  // 继承 eslint 中推荐的 (打钩的) 规则项
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    './.eslintrc-auto-import.json'
  ],
  // 针对特定文件或目录应用不同的规则或配置（配置覆盖）
  overrides: [
    {
      files: ['*.nvue'],
      // 无需重复配置 parser，因为就是vue语法
      // parser: 'vue-eslint-parser',
      rules: {
        'vue/comment-directive': 'off', // 忽略条件编译注释
        'vue/no-v-html': 'off' // nvue 不支持 v-html
      }
    },
  ],
  /**
   * off 或 0 - 关闭规则
   * warn 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * error 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // 控制一/多行可接受的属性量
    'vue/max-attributes-per-line': ['error', {
      'singleline': { 'max': 10 },
      'multiline': { 'max': 1, }
    }],
    'vue/multi-word-component-names': 'off', // 关闭vue/多词组件名称要求组件名称始终为多字
    'vue/attribute-hyphenation': 'off', // 关闭限制自定义组件的属性风格
    'vue/singleline-html-element-content-newline': 'off', // 关闭在单行元素的内容之前和之后需要换行
    'vue/require-default-prop': 'off', // 关闭 props 需要默认值
    'vue/no-multiple-template-root': 'off', // 关闭 禁止向模板添加多个根节点
    'indent': ['error', 2, { 'SwitchCase': 1 }], // 缩进使用 2个空格
    'semi': ['error', 'always'], // 强制在语句末尾使用分号
    'no-var': 'off', // 禁用 var，用 let 和 const 代替
    'no-multiple-empty-lines': ['error', { 'max': 1 }], // 空行最多不能超过 1 行
    'eqeqeq': ['warn', 'always', { 'null': 'ignore' }], // 必须使用 === 和 !== ，和 null 对比时除外
    'comma-spacing': ['error', { 'before': false, 'after': true }], // 控制逗号前后的空格
    'no-multi-spaces': 'error', // 禁止使用多个空格
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }], // 强制使用单引号 & 允许字符串使用反勾号
    'space-before-blocks': ['error', 'always'], // 强制在块之前使用一致的空格
    'space-infix-ops': 'error', // 要求操作符周围有空格
    'object-curly-spacing': ['error', 'always'], // 强制在花括号中使用一致的空格
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }], // 强制在对象字面量的属性中键和值之间使用一致的间距
    'space-in-parens': ['error', 'never'], // 强制圆括号内没有空格
    'no-fallthrough': 'off', // 关闭 禁止 case 语句落空
    'block-spacing': ['error', 'always'], // 代码块花括号前后的空格规则
    'keyword-spacing': 'error', // 关键字前后必须有空格
    'arrow-spacing': 'error', // 箭头函数前后使用空格
    'no-unused-vars': 'off', // 禁止出现未使用过的变量
    'no-useless-catch': 'off', // 禁止不必要的 catch 子句
    'no-async-promise-executor': 'off', // 禁止使用异步函数作为 Promise executor
    'require-atomic-updates': 'off', // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
    'no-unreachable': 'off', // 禁止在 return、throw、continue 和 break 语句后出现
    'no-case-declarations': 'off', // 禁止在 case 或 default 子句中出现词法声明
  }
};
