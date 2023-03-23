

import { List, Grid, Avatar, Button, Card, Toast } from 'antd-mobile'
import {
    useNavigate,
  } from 'react-router-dom'
import {
    AddOutline,
} from 'antd-mobile-icons'
// import { connect } from 'react-redux'
import './styles.less'
function Apps(props) {
    const NavigateTo = useNavigate()
    const items = [
        {
            icon: 'play-fill',
            path: '/my/records',
            name: '最近播放'
        },
        {
            icon: 'music-album',
            name: '本地/下载'
        },
        {
            icon: 'cloud-upload-fill',
            name: '云盘'
        },
        {
            icon: 'dj',
            name: 'DJ专区'
        },
        {
            icon: 'team',
            name: '我的好友'
        },
        {
            icon: 'star',
            name: '收藏和赞'
        },
        {
            icon: 'cloud',
            name: '推歌精选'
        },
        {
            icon: 'bag-check',
            name: '已购'
        },
        {
            icon: 'cidai',
            name: '经典专区'
        },
        {
            icon: 'moon-fill',
            name: '助眠解压'
        },
        {
            icon: 'film',
            name: '影视原声专区'
        },
        {
            icon: 'tv',
            name: '热歌放映厅'
        }
    ]
    // console.log(props.user, 'props.user');
    return <Card className='my-apps'
    style={{width: '100%', backgroundColor: '#f8f8f8'}}
    bodyStyle={{ borderRadius: '10px', boxShadow: '0 0 10px #e8e8e8', margin: '0', backgroundColor: '#fff' }}
    >
        <Grid columns={4} gap={12} className='my-apps-list'>
        {
            items.map(el =>
                <Grid.Item key={el.name}>
                <div className={'flexbox-v align-c'} onClick={() => el.path ? NavigateTo(el.path) : Toast.show('尽请期待~')}>
                    <span className={'icon iconmusic icon-music-' + el.icon}></span>
                    <span className='name'>{el.name}</span>
                </div>
            </Grid.Item>
            )
        }
        </Grid>
        <div className='footer'><AddOutline className='icon' onClick={() => Toast.show('尽请期待~')} />音乐应用</div>
    </Card>
}
export default Apps
