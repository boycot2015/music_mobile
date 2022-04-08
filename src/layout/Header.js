import { NavBar } from 'antd-mobile'
import logo from '../logo.svg';
import config from '@/config'
import {
    useNavigate,
    useLocation,
  } from 'react-router-dom'
import routes from '../routes'
function Header() {
    const location = useLocation()
      const navigate = useNavigate()
    const { pathname } = location
    const currentRoute = routes.filter(el => el.key === pathname)[0]
    document.title = config.websiteName + '-' + currentRoute.title
    if (currentRoute.hideNavBar) return null
  return (
    <header className="music-header">
        <NavBar back={pathname !== '/home' ? '' : null} onBack={() => navigate(-1)}>{currentRoute.title}</NavBar>
        <img src={logo} className="music-logo" alt="logo" />
    </header>
  );
}

export default Header;
