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

  const tabs = routes.filter(el => el.showInTabBar)
  const setRouteActive = (value) => {
    NavigateTo(value)
  }
  const currentRoute = routes.filter(el => el.key === pathname)[0]
  if (currentRoute && currentRoute.hideTabBar) return null
  return (
    <TabBar className={'music-footer'} activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        // title={<span style={{fontSize: 14}}>{item.title}</span>}
        <TabBar.Item key={item.key} icon={item.icon} title={<span style={{fontSize: 12}}>{item.title}</span>} />
      ))}
    </TabBar>
  )
}
export default Footer