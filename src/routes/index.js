import {
    AppOutline,
    MessageOutline,
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
import My from '@/pages/my'
import CustomList from '@/pages/custom-list'

import list from './modules/list'
import comment from './modules/comment'
import search from './modules/search'
import SearchBar from '@/pages/search/components/searchBar'
import { Toast, NavBar } from 'antd-mobile'
const routes = [
    {
        key: '/home',
        title: '首页',
        element: <Home />,
        showPlayer: true,
        // hideNavBar: true,
        navConfig: {
            backArrow: -1,
            showMenu: true,
            showSearch: true,
            right: <AudioOutline onClick={() => Toast.show('建设中~')} style={{'fontSize': 24}} />
        },
        showInTabBar: true,
        icon: <AppOutline />,
    },
    {
        key: '/attention',
        title: '我的关注',
        auth: true,
        element: <Attention />,
        hideNavBar: true,
        showPlayer: true,
        showInTabBar: false,
        icon: <TeamOutline />,
    },
    {
        key: '/message',
        title: '我的消息',
        auth: true,
        showInTabBar: true,
        hideNavBar: true,
        showPlayer: true,
        element: <Message />,
        icon: <MessageOutline />,
    },
    {
        key: '/my',
        element: <My />,
        showInTabBar: true,
        // hideNavBar: true,
        title: '我的',
        auth: true,
        showPlayer: true,
        icon: <UserOutline />,
        navConfig: {
            backArrow: -1,
            showMenu: true,
            hideTitle: true,
            showSearch: false,
            right: (navigate) => {
                return <SearchOutline onClick={() => {
                    navigate('/search')
                }} style={{'fontSize': 24}} />
            }
        },
    },
    {
        key: '/custom/list',
        element: <CustomList />,
        hideTabBar: true,
        title: '列表',
        showPlayer: true,
        icon: <UserOutline />,
    },
    ...search,
    ...list,
    ...comment,
    {
        key: '/login',
        element: <Login />,
        hideTabBar: true,
        title: '登录',
        hideNavBar: true,
        showPlayer: false,
        icon: <UserOutline />,
    },
]
export default routes