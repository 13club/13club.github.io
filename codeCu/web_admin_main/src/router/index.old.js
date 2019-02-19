import Router from 'vue-router'
import Vue from 'vue'
import App from '@/App'
import User from '@/view/User'
import Login from '@/view/user/Login/Login'
import Admin from '@/view/Admin'
import Home from '@/view/admin/Home/Home'
import Order from '@/view/admin/Order/Order'
import NewCourse from '@/view/admin/NewCourse/NewCourse'
import Spread from '@/view/admin/Spread/Spread'
import CourseList from '@/view/admin/CourseList/CourseList'
import Banner from '@/view/admin/Banner/Banner'
import TemmsgList from '@/view/admin/TemmsgList/TemmsgList'
import Temmsg from '@/view/admin/Temmsg/Temmsg'
import CouponList from '@/view/admin/CouponList/CouponList'
import NewCoupon from '@/view/admin/NewCoupon/NewCoupon'
import Coupon from '@/view/admin/Coupon/Coupon'
import ActList from '@/view/admin/ActList/ActList'
import NewActivity from '@/view/admin/NewActivity/NewActivity'
import Activity from '@/view/admin/Activity/Activity'
import CustomermsgList from '@/view/admin/CustomermsgList/CustomermsgList'
import Customermsg from '@/view/admin/Customermsg/Customermsg'

Vue.use(Router)
export const adminRoutes = [{
  path: '', // 登录
  redirect: 'home'
},
{
  path: 'home', // 主页
  name: 'home',
  meta: { authMedia: false, title: '主页', icon: 'menu', inNav: true, needLogin: true },
  component: Home
},
{
  path: 'courseList', // 课程列表
  name: 'courseList',
  meta: { authMedia: false, title: '课程列表', icon: 'menu', inNav: true, needLogin: true },
  component: CourseList
},
{
  path: 'order', // 订单页
  name: 'order',
  meta: { authMedia: false, title: '订单页', icon: 'menu', inNav: true, needLogin: true },
  component: Order
},
{
  path: 'newCourse', // 新建课程
  name: 'newCourse',
  meta: { authMedia: false, title: '新建课程', icon: 'menu', inNav: false, needLogin: true },
  component: NewCourse
},
{
  path: 'spread', // 推广管理
  name: 'spread',
  meta: { authMedia: false, title: '推广管理', icon: 'menu', inNav: true, needLogin: true },
  component: Spread
},
{
  path: 'banner', // banner管理
  name: 'banner',
  meta: { authMedia: false, title: 'banner管理', icon: 'menu', inNav: true, needLogin: true },
  component: Banner
},
{
  path: 'temmsg', // 模板消息
  name: 'temmsg',
  meta: { authMedia: false, title: '模板消息', icon: 'menu', inNav: false, needLogin: true },
  component: Temmsg
},
{
  path: 'temmsgList', // 模板管理
  name: 'temmsgList',
  meta: { authMedia: false, title: '模板管理', icon: 'menu', inNav: true, needLogin: true },
  component: TemmsgList
},
{
  path: 'couponList', // 优惠券列表管理
  name: 'couponList',
  meta: { authMedia: false, title: '优惠券管理', icon: 'menu', inNav: true, needLogin: true },
  component: CouponList
},
{
  path: 'actList', // 优惠活动管理
  name: 'actList',
  meta: { authMedia: false, title: '优惠活动管理', icon: 'menu', inNav: true, needLogin: true },
  component: ActList
},
{
  path: 'dataCenter', // 数据中心
  meta: { authMedia: false, title: '数据中心', icon: 'menu', inNav: true },
  component: { template: '<div><router-view></router-view></div>' },
  children: [{
    path: 'ltv', // 生命周期价值
    name: 'ltv',
    meta: { authMedia: false, title: '生命周期价值', icon: 'menu', inNav: true, needLogin: true },
    component: () => import('@/view/admin/LTV/ltv')
  }]
},
{
  path: 'newAcitvity', // 新建优惠活动
  name: 'newAcitvity',
  meta: { authMedia: false, title: '新建优惠活动', icon: 'menu', inNav: false, needLogin: true },
  component: NewActivity
},
{
  path: 'activity', // 优惠活动
  name: 'activity',
  meta: { authMedia: false, title: '优惠活动', icon: 'menu', inNav: false, needLogin: true },
  component: Activity
},
{
  path: 'newCoupon', // 优惠券管理
  name: 'newCoupon',
  meta: { authMedia: false, title: '优惠券', icon: 'menu', inNav: false, needLogin: true },
  component: NewCoupon
},
{
  path: 'coupon', // 优惠券详情
  name: 'coupon',
  meta: { authMedia: false, title: '优惠券', icon: 'menu', inNav: false, needLogin: true },
  component: Coupon
},
{
  path: 'customermsgList', // 客服消息管理
  name: 'customermsgList',
  meta: { authMedia: false, title: '客服消息管理', icon: 'menu', inNav: true, needLogin: true },
  component: CustomermsgList
},
{
  path: 'customermsg', // 客服消息管理
  name: 'customermsg',
  meta: { authMedia: false, title: '客服消息管理', icon: 'menu', inNav: false, needLogin: true },
  component: Customermsg
}]

export const routesConfig = [{
  path: '/',
  component: App,
  children: [{
    path: '',
    redirect: 'admin'
  },
  {
    path: 'user',
    meta: { authMedia: false, title: '用户中心', icon: 'menu' },
    component: User,
    children: [{
      path: 'login', // 登录页
      name: 'login',
      meta: { authMedia: false, title: '登录页', icon: 'menu' },
      component: Login
    }]
  },
  {
    path: 'admin', // 主页
    meta: { authMedia: false, title: '主页', icon: 'menu', inNav: true },
    component: Admin,
    children: adminRoutes
  }]
}]

export const router = new Router({
  routes: routesConfig
})
