import { createRouter, createWebHistory } from 'vue-router'
import AdminAnalyticsView from '@/views/AdminAnalyticsView.vue'
import AdminNotificationsView from '@/views/AdminNotificationsView.vue'
import AdminPropertiesView from '@/views/AdminPropertiesView.vue'
import AdminUsersView from '@/views/AdminUsersView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import PropertyListView from '@/views/PropertyListView.vue'
import PropertyView from '@/views/PropertyView.vue'
import RegisterPropertyView from '@/views/RegisterPropertyView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminAnalyticsView
    },
    {
      path: '/admin/notifications',
      name: 'adminNotifications',
      component: AdminNotificationsView
    },
    {
      path: '/admin/properties',
      name: 'adminProperties',
      component: AdminPropertiesView
    },
    {
      path: '/admin/users',
      name: 'adminUsers',
      component: AdminUsersView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/properties',
      name: 'properties',
      component: PropertyListView,
    },
    {
      path: '/property',
      name: 'property',
      component: PropertyView,
    },
    {
      path: '/property/register',
      name: 'propertyRegister',
      component: RegisterPropertyView,
    },
    
  ]
})

export default router
