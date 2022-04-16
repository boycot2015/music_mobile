import { useEffect, useState, useRef } from 'react'
import { NavBar, SearchBar, Popup } from 'antd-mobile'
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
  return (
    <div className="music-header">
        <NavBar className="music-header"
        backArrow={pathname !== '/home'}
        back={pathname !== '/home' ? '' : null}
        left={pathname !== '/home' ? '' : <MenuOutlined onClick={() => setShowMenu(!showMenu)} style={{'fontSize': 20}} />}
        right={pathname !== '/home' ? '' : <AudioOutline style={{'fontSize': 24}} />}
        onBack={() => navigate(-1)}>
            {pathname !== '/home' ? title : '' }
            {/* <img src={logo} className="music-logo" alt="logo" /> */}
            {pathname === '/home' && <SearchBar
                placeholder='搜索音乐、歌手、歌单'
                style={{
                //   '--background': '#ffffff',
                '--border-radius': '50px',
                padding: 0,
                margin: '15px 0'
            }}
            />}

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
