import {
    UserOutline,
} from 'antd-mobile-icons'
import Commit from '@/pages/commit'
import SongList from '@/pages/song'

const routes = [
    {
        key: '/commit',
        element: <Commit />,
        hideTabBar: true,
        showPlayer: true,
        title: '评论',
    },

]
export default routes