import { createRouter, createWebHistory } from "vue-router";
import DogDetail from "@/views/DogDetail.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ShenQing from "@/views/ShenQing.vue";
import AdoptedDogs from "@/views/AdoptedDogs.vue";

const routes = [
  {
    path: "/DogDetail/:id",
    name: "DogDetail",
    component: DogDetail,
    meta: { requiresAuth: true },//需要判断的组件
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
    {
    path: '/AdoptedDogs',
    name: 'AdoptedDogs',
    component: AdoptedDogs,
    meta: { requiresAuth: true },
  },
  {
    path: "/ShenQing/:id",
    name: "ShenQing",
    component: ShenQing,
    meta: { requiresAuth: true },
  },
  // 兜底：未匹配的路径重定向到首页
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
//to去，from来自
router.beforeEach((to) => {
  // 判断目标路由是否需要登录
  if (to.meta.requiresAuth && !localStorage.getItem("user")) {
    // 未登录：重定向到登录页，并记录目标路径用于登录后回跳
    alert("还未登录");
    return { path: "/Login", query: { redirect: to.fullPath } };
  }
  // 其余情况直接放行
  return true;
});
export default router;
