import {
    UserOutline,
} from 'antd-mobile-icons'
import CategoryList from '@/pages/list'
import SongList from '@/pages/song'
import PhList from '@/pages/ph'

const routes = [
    {
        key: '/category/list',
        element: <CategoryList />,
        hideTabBar: true,
        showPlayer: true,
        title: '歌单列表',
        icon: <UserOutline />,
    },
    {
        key: '/song/ph',
        element: <PhList />,
        hideTabBar: true,
        showPlayer: true,
        title: '排行榜',
        icon: <UserOutline />,
    },
    {
        key: '/song/list',
        element: <SongList />,
        hideTabBar: true,
        showPlayer: true,
        title: '歌单详情',
        icon: <UserOutline />,
    },

]
export default routes