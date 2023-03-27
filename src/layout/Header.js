import { useEffect, useState, useRef } from 'react'
import { NavBar, SearchBar, Popup, Toast } from 'antd-mobile'
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
import {
    MenuOutlined
} from '@ant-design/icons'
import routes from '../routes'
import MenuList from '@/components/Menu';
function Header(props) {
    const location = useLocation()
    const navigate = useNavigate()
      const [showMenu, setShowMenu] = useState(false);
    const { pathname, state } = location
    const currentRoute = routes.filter(el => el.key === pathname)[0]
    currentRoute && (document.title = config.websiteName + '-' + currentRoute.title)
    if (!currentRoute || currentRoute.hideNavBar) return null
    let title = (state !== null && state.title) || currentRoute.title
    if (props.al) {
        title = props.name + ' - ' + props.ar?.map(el => el.name).join('/')
        props.isPlay && (document.title = '正在播放：' + title)
    }
    const { navConfig = {} } = currentRoute
  return (
    <div className="music-header" style={{...navConfig.style || {}}}>
        <NavBar className="music-header"
        backArrow={!navConfig.backArrow}
        back={!navConfig.backArrow ? '' : null}
        left={navConfig.showMenu ? <MenuOutlined onClick={() => setShowMenu(!showMenu)} style={{'fontSize': 20}} /> : navConfig.left instanceof Function ? navConfig.left(navigate) : navConfig.left || '' }
        right={navConfig.right ? navConfig.right instanceof Function ? navConfig.right(navigate) : navConfig.right : ''}
        onBack={() => navigate(-1)} style={{...navConfig.style || {}}}>
            {/* <img src={logo} className="music-logo" alt="logo" /> */}
            {navConfig.showSearch ? <SearchBar
                placeholder='搜索音乐、歌手、歌单'
                onFocus={() => navigate('/search')}
                style={{
                //   '--background': '#ffffff',
                '--border-radius': '50px',
                padding: 0,
                margin: '15px 0'
            }}
            /> : navConfig.hideTitle ? '' : title || ''}

        </NavBar>
            <Popup
            bodyStyle={{ width: '80vw' }}
                position='left'
                visible={showMenu}
                onMaskClick={() => {
                    setShowMenu(false)
            }}>
                <MenuList />
            </Popup>
    </div>
  );
}

export default Header;
