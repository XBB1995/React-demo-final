import {
  ArticleEdit,
  ArticleList,
  Dashboard,
  Login,
  NotFound,
  Settings,
  Notifications
} from '../views'

export const mainRoutes = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRoutes = [{
  pathname: '/admin/dashboard',
  component: Dashboard,
  icon: 'dashboard',
  title: '仪表盘',
  isNav: true
}, {
  pathname: '/admin/article',
  component: ArticleList,
  title: '文章管理',
  icon: 'unordered-list',
  isNav: true,
  exact: true
}, {
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit
}, {
  pathname: '/admin/Notifications',
  component: Notifications
}, {
  pathname: '/admin/settings',
  component: Settings,
  icon: 'setting',
  title: '设置',
  isNav: true
}]