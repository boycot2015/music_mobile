import {
    SearchOutline,
} from 'antd-mobile-icons'
import My from '@/pages/my'
import Record from '@/pages/my/records'

const routes = [
    {
        key: '/my',
        element: <My />,
        showInTabBar: true,
        // hideNavBar: true,
        title: '我的',
        auth: true,
        showPlayer: true,
        icon: <i className='iconmusic icon-music-music-fill' style={{'fontSize': 28}} />,
        navConfig: {
            backArrow: -1,
            showMenu: true,
            hideTitle: true,
            showSearch: false,
            style: {
                backgroundColor: '#f8f8f8'
            },
            right: (navigate) => {
                return <SearchOutline onClick={() => {
                    navigate('/search')
                }} style={{'fontSize': 28}} />
            }
        },
    },
    {
        key: '/my/records',
        title: '最近播放',
        auth: true,
        element: <Record />,
        hideNavBar: false,
        showPlayer: true,
        hideTabBar: true,
        showInTabBar: false,
        icon: <SearchOutline style={{'fontSize': 28}} />,
    },

]
export default routes