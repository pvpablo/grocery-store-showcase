import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/confirm/:orderId',
    name: 'confirm',
    component: () => import('../views/Confirm.vue')
  },
  {
    path: '/fulfillment/orders',
    name: 'internal_orders',
    component: () => import('../views/fulfillment/Orders.vue') //TODO: add role based validation
  },
  {
    path: '/fulfillment/orders/:orderId',
    name: 'internal_order_detail',
    component: () => import('../views/fulfillment/OrderDetail.vue') //TODO: add role based validation
  },
  {
    path: '/dashboard/ecommerce',
    name: 'ecommerce',
    component: () => import('../views/dashboard/Ecommerce.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
