import React from 'react'
import { TabBar } from 'antd-mobile'
import {
  useNavigate,
  useLocation,
} from 'react-router-dom'
import routes from '../routes'
import config from '@/config'
const Footer = () => {
  const NavigateTo = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const tabs = routes.filter(el => el.showInTabBar)
  const setRouteActive = (value) => {
    let cookie = localStorage.getItem(config.appPrefix + '_cookie')
    if (tabs.filter(el => el.key === value)[0]?.auth && !cookie) {
        NavigateTo('/login')
        return
    }
    NavigateTo(value)
  }
  const currentRoute = routes.filter(el => el.key === pathname)[0]
  if (currentRoute && currentRoute.hideTabBar) return null
  return (
    <TabBar className={'music-footer'} activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}
export default Footer