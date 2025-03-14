import { createRouter } from 'uni-mini-router';
// 导入pages.json
import pagesJson from '../pages.json';
// 引入uni-parse-pages
import pagesJsonToRoutes from 'uni-parse-pages';
// 生成路由表
const routes = pagesJsonToRoutes(pagesJson);

const router = createRouter({
  routes: [...routes] // 路由表信息
});

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  next();
});

// 全局路由后置守卫
router.afterEach((to, from) => {
  // console.log('跳转结束');
});

export default router;
