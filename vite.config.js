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
  plugins: [
    uni(),
    eslintPlugin(),
    AutoImport({
      imports: ['vue', 'uni-app'], // 自动导入vue和uni-app相关函数
      dts: 'src/auto-imports.d.ts', // 生成类型声明文件
      // 问题？：unplugin-auto-import 自动导入的变量在代码中被使用，但 ESLint 并没有检测到相应的import语句 | 插件冲突错误
      // 解决：如果使用了 eslint, 则会在项目根目录生成类型文件 .eslintrc-auto-import.json ，*并且确保该文件在 eslint 配置中 extends 属性中被继承*
      eslintrc: {
        enabled: true,
      },
    }),
  ],
});
