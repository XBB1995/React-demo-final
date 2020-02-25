import {
  ArticleEdit,
  ArticleList,
  Dashboard,
  Login,
  NotFound,
  Settings,
  Notifications,
  NoAuth,
  Profile
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
  isNav: true,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/article',
  component: ArticleList,
  title: '文章管理',
  icon: 'unordered-list',
  isNav: true,
  exact: true,
  roles: ['001', '002']
}, {
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit,
  roles: ['001', '002']
}, {
  pathname: '/admin/notifications',
  component: Notifications,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/profile',
  component: Profile,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/noauth',
  component: NoAuth,
  roles: ['001', '002', '003']
}, {
  pathname: '/admin/settings',
  component: Settings,
  icon: 'setting',
  title: '设置',
  isNav: true,
  roles: ['001']
}]