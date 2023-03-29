import {
    UserOutline
} from 'antd-mobile-icons'
import MvDetail from '@/pages/mv/detail'
import MvList from '@/pages/mv'

const routes = [
    {
        key: '/mv/list',
        element: <MvList />,
        hideTabBar: true,
        showPlayer: true,
        title: 'mv列表',
        icon: <UserOutline />,
    },
    {
        key: '/mv/detail',
        element: <MvDetail />,
        hideTabBar: true,
        showPlayer: false,
        hideNavBar: true,
        title: 'mv详情',
        icon: <UserOutline />,
    },

]
export default routes