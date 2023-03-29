import {
    UserOutline,
} from 'antd-mobile-icons'
import Search from '@/pages/search'
import SearchDetail from '@/pages/search/detail'

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
    {
        key: '/search/detail',
        element: <SearchDetail />,
        hideTabBar: true,
        title: '搜索列表',
        hideNavBar: true,
        auth: true,
        showPlayer: true,
        icon: <UserOutline />
    },

]
export default routes