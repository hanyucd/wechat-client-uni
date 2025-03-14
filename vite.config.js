import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import eslintPlugin from 'vite-plugin-eslint2';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: true,
  },
  css: {
    // https://cn.vitejs.dev/config/#css-preprocessoroptions
    preprocessorOptions: {
      scss: {
        // 将 scss 代码注入到每个组件的样式中，因此（变量、混入、函数）等可以在组件样式中直接使用
        additionalData: `
          @import "@/styles/var.scss";
        `,
      },
    },
  },
  plugins: [
    uni(),
    eslintPlugin(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
        /\.nvue$/ // 包含 .nvue 文件
      ],
      // 自动导入vue和uni-app相关函数
      imports: [
        'vue',
        'uni-app',
        {
          from: 'uni-mini-router',
          imports: ['createRouter', 'useRouter', 'useRoute']
        }
      ],
      dts: 'src/auto-imports.d.ts', // 生成类型声明文件
      // 问题？：unplugin-auto-import 自动导入的变量在代码中被使用，但 ESLint 并没有检测到相应的import语句 | 插件冲突错误
      // 解决：如果使用了 eslint, 则会在项目根目录生成类型文件 .eslintrc-auto-import.json ，*并且确保该文件在 eslint 配置中 extends 属性中被继承*
      eslintrc: {
        enabled: true,
      },
    }),
  ],
});
