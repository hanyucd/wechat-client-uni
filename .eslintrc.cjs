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
    UniApp: true,
  },
  // parser 是 ESLint 配置文件的顶级选项，用于指定整个 ESLint 配置使用的解析器。这是设置解析器的主要方式
  parser: 'vue-eslint-parser',
  // 解析器选项
  parserOptions: {
    parser: '@typescript-eslint/parser', // 对 <script lang="ts"> 使用 TS 解析器
    ecmaVersion: 'latest', // JavaScript 语言选项 es*@babel/eslint-parser
    // sourceType: 'module',
  },
  // 继承 eslint 中推荐的 (打钩的) 规则项
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
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
    // eslint (http://eslint.cn/docs/rules)
    semi: ['error', 'always'], // 强制在语句末尾使用分号
    quotes: ['error', 'single', { allowTemplateLiterals: true }], // 强制使用单引号 & 允许字符串使用反勾号
    'no-unused-vars': 'off', // 禁止使用未声明的变量
    // 强制操作符周围有空格 (包含等号)
    'space-infix-ops': ['error', { 'int32Hint': false }],
    // 禁止出现多个空格
    'no-multi-spaces': 'error',
    // 'object-curly-spacing': 'off',
    
    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/object-curly-spacing': ['error', 'always'], // 需要大括号内有间距
    '@typescript-eslint/semi': 'error', // 强制在语句末尾使用分号
    '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }], // 强制使用单引号 & 允许字符串使用反勾号
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/space-infix-ops': 'error', // 要求中缀操作符周围有空格
    '@typescript-eslint/key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }], // 强制在对象字面量的属性中键和值之间使用一致的间距
    // 接口和类型别名中的成员之间分隔符
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': { 'delimiter': 'semi', 'requireLast': true },
        'singleline': { 'delimiter': 'semi', 'requireLast': false },
        'multilineDetection': 'brackets'
      }
    ],

    'no-multiple-empty-lines': ['error', { 'max': 1 }], // 空行最多不能超过 1 行

    // vue (https://eslint.vuejs.org/rules)
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容前后需要换行符
    'vue/require-default-prop': 'off', // 关闭 props 需要默认值
    'vue/no-v-html': 'off', // 关闭 Disallow use of v-html to prevent XSS attack
    'vue/multi-word-component-names': 'off', // 关闭 组件名称始终是多个单词
    'vue/v-on-event-hyphenation': 'off', // 禁止对模板中的自定义组件强制执行 v-on 事件命名样式
    'vue/prop-name-casing': 'off', // 关闭 组件的 prop 名称大小写
    'vue/attribute-hyphenation': 'off',
    // 控制一/多行可接受的属性量
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 10 },
        multiline: { max: 1 },
      },
    ],
    // 空标签需要自闭合
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  }
};
