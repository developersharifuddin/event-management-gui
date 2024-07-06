// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/events',
    name: 'EventList',
    component: () => import('../views/backend/event/EventList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/event/create',
    name: 'eventCreate',
    component: () => import('../views/backend/event/EventCreate.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-event/:id',
    name: 'editEvent',
    component: () => import('../views/backend/event/EditEvent.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/view-event/:id',
    name: 'eventDetails',
    component: () => import('../views/backend/event/EventDetails.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/my-account',
    name: 'myAccount',
    component: () => import('../views/backend/auth/Account.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'loginUser',
    component: () => import('../views/backend/auth/LoginUser.vue')
  },
  {
    path: '/register',
    name: 'registerUser',
    component: () => import('../views/backend/auth/RegisterUser.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      localStorage.removeItem('token') // Remove the token from local storage
      next({ name: 'loginUser' }) // Redirect to the login page
    },
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') // Check if token exists

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'loginUser' }) // Redirect to login page if not authenticated
  } else if (to.name === 'loginUser' && isAuthenticated) {
    next({ name: 'home' }) // Redirect to home if authenticated and trying to access login page
  } else {
    next()
  }
})

export default router
