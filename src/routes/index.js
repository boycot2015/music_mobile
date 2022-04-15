import {
    AppOutline,
    MessageOutline,
    TeamOutline,
    UserOutline,
} from 'antd-mobile-icons'
import Home from '@/pages/home'
import Attention from '@/pages/attention'
import Message from '@/pages/message'
import PersonalCenter from '@/pages/userCenter'
import CustomList from '@/pages/custom-list'
import list from './modules/list'
import commit from './modules/commit'
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
        element: <Attention />,
        hideNavBar: true,
        showPlayer: true,
        showInTabBar: true,
        icon: <TeamOutline />,
    },
    {
        key: '/message',
        title: '我的消息',
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
    ...commit
]
export default routes