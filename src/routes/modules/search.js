import {
    UserOutline,
} from 'antd-mobile-icons'
import Search from '@/pages/search'

const routes = [
    {
        key: '/search',
        element: <Search />,
        hideTabBar: true,
        title: '搜索',
        auth: true,
        showPlayer: true,
        icon: <UserOutline />
    },

]
export default routes