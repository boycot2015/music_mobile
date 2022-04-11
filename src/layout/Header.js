import { NavBar, SearchBar } from 'antd-mobile'
import logo from '../logo.svg';
import config from '@/config'
import {
    useNavigate,
    useLocation,
  } from 'react-router-dom'
import {
    AudioOutline,
    UnorderedListOutline,
    MovieOutline
} from 'antd-mobile-icons'
import routes from '../routes'
function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const { pathname, state } = location
    const currentRoute = routes.filter(el => el.key === pathname)[0]
    currentRoute && (document.title = config.websiteName + '-' + currentRoute.title)
    if (!currentRoute || currentRoute.hideNavBar) return null
    const title = (state !== null && state.title) || currentRoute.title
  return (
    <div className="music-header">
        <NavBar className="music-header"
        backArrow={pathname !== '/home'}
        back={pathname !== '/home' ? '' : <UnorderedListOutline style={{'fontSize': 24}} />}
        right={pathname !== '/home' ? '' : <AudioOutline style={{'fontSize': 24}} />}
        onBack={() => navigate(-1)}>
            {pathname !== '/home' ? title : '' }
            {/* <img src={logo} className="music-logo" alt="logo" /> */}
            {pathname === '/home' && <SearchBar
                placeholder='搜索音乐、歌手、歌单'
                style={{
                //   '--background': '#ffffff',
                '--border-radius': '50px',
                padding: '0 15px',
                margin: '15px 0'
            }}
            />}

        </NavBar>
    </div>
  );
}

export default Header;
