import {
    AppOutline,
    MessageOutline,
    TeamOutline,
    UserOutline,
} from 'antd-mobile-icons'
import Login from '@/pages/login'
import Home from '@/pages/home'
import Attention from '@/pages/attention'
import Message from '@/pages/message'
import PersonalCenter from '@/pages/userCenter'
import CustomList from '@/pages/custom-list'
import list from './modules/list'
import comment from './modules/comment'
const routes = [
    {
        key: '/home',
        title: '首页',
        element: <Home />,
        showPlayer: true,
        // hideNavBar: true,
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
        showInTabBar: true,
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
        key: '/userCenter',
        element: <PersonalCenter />,
        showInTabBar: true,
        hideNavBar: true,
        title: '我的',
        auth: true,
        showPlayer: true,
        icon: <UserOutline />,
    },
    {
        key: '/custom/list',
        element: <CustomList />,
        hideTabBar: true,
        title: '列表',
        showPlayer: true,
        icon: <UserOutline />,
    },
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