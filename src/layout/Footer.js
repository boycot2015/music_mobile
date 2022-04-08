import React from 'react'
import { TabBar } from 'antd-mobile'
import {
  useNavigate,
  useLocation,
} from 'react-router-dom'
import routes from '../routes'
const Footer = () => {
  const NavigateTo = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value) => {
    NavigateTo(value)
  }
  const currentRoute = routes.filter(el => el.key === pathname)[0]
  const tabs = routes.filter(el => el.showInTabBar)
  if (currentRoute.hideTabBar) return null
  return (
    <TabBar className={'music-footer'} activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}
export default Footer