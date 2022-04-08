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

const routes = [
    {
        key: '/home',
        title: '首页',
        element: <Home />,
        hideNavBar: true,
        showInTabBar: true,
        icon: <AppOutline />,
      },
      {
        key: '/attention',
        title: '我的关注',
        element: <Attention />,
        hideNavBar: true,
        showInTabBar: true,
        icon: <TeamOutline />,
      },
      {
        key: '/message',
        title: '我的消息',
        showInTabBar: true,
        hideNavBar: true,
        element: <Message />,
        icon: <MessageOutline />,
      },
      {
        key: '/userCenter',
        element: <PersonalCenter />,
        showInTabBar: true,
        hideNavBar: true,
        title: '我的',
        icon: <UserOutline />,
      },
      {
        key: '/custom/list',
        element: <CustomList />,
        hideTabBar: true,
        title: '列表',
        icon: <UserOutline />,
    }

]
export default routes