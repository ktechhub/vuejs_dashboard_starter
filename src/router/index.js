import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import Profile from "../views/Profile.vue";

const routes = [
  // Auth Routes
  {
    path: '/login',
    name: 'Login',
    meta: {redirectAuthenticatedUser: true},
    component: () => import('../views/auth/Signin.vue')
  },
  {
    path: "/signup",
    name: "Signup",
    meta: {redirectAuthenticatedUser: true},
    component: () => import('../views/auth/Signup.vue'),
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    meta: {redirectAuthenticatedUser: true},
    component: () => import('../views/auth/VerifyEmail.vue'),
  },
  {
    path: "/resend-code",
    name: "ResendCode",
    meta: {redirectAuthenticatedUser: true},
    component: () => import('../views/auth/ResendCode.vue'),
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    meta: {redirectAuthenticatedUser: true},
    component: () => import('../views/auth/ForgetPassword.vue'),
  },
  {
    path: "/confirm-forget-password",
    name: "ConfirmForgetPassword",
    meta: {redirectAuthenticatedUser: true},
    component: () => import('../views/auth/ConfirmForgetPassword.vue'),
  },
  {
    path: "/",
    name: "/",
    meta: {requiresAuth: true},
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {requiresAuth: true},
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: {requiresAuth: true},
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: {requiresAuth: true},
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
    meta: {requiresAuth: true},
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {requiresAuth: true},
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
});

// router middleware
router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(localStorage.getItem("isLoggedIn")){
      next()
    }else{
      next('/login')
    }
  }
  if(to.matched.some((record) => record.meta.redirectAuthenticatedUser)){
    if(localStorage.getItem("isLoggedIn")){
      next('/')
    }else{
      next()
    }
  }
})

export default router;
