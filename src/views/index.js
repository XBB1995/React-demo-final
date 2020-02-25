// 按需加载
import { Loading } from '../compoents'
// import Loadable from 'react-loadable'
import Loadable from './loadable'

const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/Edit'),
  loading: Loading
})
const ArticleList = Loadable({
  loader: () => import('./Article'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loading
})
const Notifications = Loadable({
  loader: () => import('./Notifications'),
  loading: Loading
})
const NoAuth = Loadable({
  loader: () => import('./NoAuth'),
  loading: Loading
})
const Profile = Loadable({
  loader: () => import('./Profile'),
  loading: Loading
})

export {
  ArticleEdit,
  ArticleList,
  Dashboard,
  Login,
  NotFound,
  Settings,
  Notifications,
  NoAuth,
  Profile
}