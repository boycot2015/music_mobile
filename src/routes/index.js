import {
    AppOutline,
    MessageFill,
    TeamOutline,
    UserOutline,
    AudioOutline,
    SearchOutline,
} from 'antd-mobile-icons'
import {
    useNavigate,
  } from 'react-router-dom'
import Login from '@/pages/login'
import Home from '@/pages/home'
import Attention from '@/pages/attention'
import Message from '@/pages/message'
import CustomList from '@/pages/custom-list'

import list from './modules/list'
import comment from './modules/comment'
import search from './modules/search'
import my from './modules/my'
import mv from './modules/mv'
import { Toast, NavBar } from 'antd-mobile'
const routes = [
    {
        key: '/home',
        title: '发现',
        element: <Home />,
        showPlayer: true,
        // hideNavBar: true,
        navConfig: {
            backArrow: -1,
            showMenu: true,
            showSearch: true,
            right: <AudioOutline  onClick={() => Toast.show('建设中~')} style={{'fontSize': 28}} />
        },
        showInTabBar: true,
        icon: <i  className='iconmusic icon-music-netease-cloud-fill' style={{'fontSize': 28}} />,
    },
    ...my,
    {
        key: '/attention',
        title: '我的关注',
        auth: true,
        element: <Attention />,
        hideNavBar: true,
        showPlayer: true,
        showInTabBar: false,
        icon: <TeamOutline style={{'fontSize': 28}} />,
    },
    {
        key: '/message',
        title: '我的消息',
        auth: true,
        showInTabBar: true,
        hideNavBar: true,
        showPlayer: true,
        element: <Message />,
        icon: <MessageFill style={{'fontSize': 28}} />,
    },
    {
        key: '/custom/list',
        element: <CustomList />,
        hideTabBar: true,
        title: '列表',
        showPlayer: true,
        icon: <UserOutline style={{'fontSize': 28}} />,
    },
    ...search,
    ...list,
    ...mv,
    ...comment,
    {
        key: '/login',
        element: <Login />,
        hideTabBar: true,
        title: '登录',
        hideNavBar: true,
        showPlayer: false,
        icon: <UserOutline style={{'fontSize': 28}} />,
    },
]
export default routes