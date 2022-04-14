import {
    UserOutline,
} from 'antd-mobile-icons'
import CategoryList from '@/pages/list'
import SongList from '@/pages/song'

const routes = [
    {
        key: '/category/list',
        element: <CategoryList />,
        hideTabBar: true,
        title: '歌单列表',
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