import {
    UserOutline,
} from 'antd-mobile-icons'
import Comment from '@/pages/comment'
import SongList from '@/pages/song'

const routes = [
    {
        key: '/comment',
        element: <Comment />,
        hideTabBar: true,
        showPlayer: false,
        title: '评论',
    },

]
export default routes