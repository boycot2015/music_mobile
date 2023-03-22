

import { List, Grid, Avatar, Button, Card } from 'antd-mobile'
import {
    useNavigate,
  } from 'react-router-dom'
import {
    PlayOutline,
    HeartFill,
    UploadOutline,
    VideoOutline,
    MovieOutline,
    StarFill,
    DownlandOutline,
    CheckCircleOutline,
    TeamOutline,
    AddOutline,
} from 'antd-mobile-icons'
import config from '@/config'
import { connect } from 'react-redux'
import './styles.less'
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch'
function PersonalCenter(props) {
    const NavigateTo = useNavigate()
    const onLogout = () => {
        localStorage.removeItem(config.appPrefix + 'userInfo')
        props.onSetUser('')
        NavigateTo('/login')
    }
    const items = [
        {
            icon: <PlayOutline />,
            name: '最近播放'
        },
        {
            icon: <DownlandOutline />,
            name: '本地/下载'
        },
        {
            icon: <UploadOutline />,
            name: '云盘'
        },
        {
            icon: <HeartFill />,
            name: 'DJ专区'
        },
        {
            icon: <TeamOutline />,
            name: '我的好友'
        },
        {
            icon: <StarFill />,
            name: '收藏和赞'
        },
        {
            icon: <UploadOutline />,
            name: '推歌精选'
        },
        {
            icon: <CheckCircleOutline />,
            name: '已购'
        },
        {
            icon: <VideoOutline />,
            name: '今典专区'
        },
        {
            icon: <DownlandOutline />,
            name: '助眠解压'
        },
        {
            icon: <VideoOutline />,
            name: '影视原声专区'
        },
        {
            icon: <MovieOutline />,
            name: '热歌放映厅'
        }
    ]
    // console.log(props.user, 'props.user');
    return <div className='flexbox-v align-c my' style={{backgroundColor: '#f8f8f8'}}>
        <div className='content' style={{width: '100%'}}>
            <Card
            title={null}
            style={{textAlign: 'center', width: '100%', backgroundColor: '#f8f8f8'}}
            bodyStyle={{ borderRadius: '10px', boxShadow: '0 0 10px #e8e8e8', margin: '16px 0', backgroundColor: '#fff' }}
            >
            <div
            className='flexbox-v align-c'
                style={{textAlign: 'left', width: '100%'}}
            >
                <div className='avatar'><Avatar style={{'--border-radius': '100%'}} src={props.user?.profile?.avatarUrl || ''} /></div>
                <div className='info flexbox-h align-c'>
                    <div className='name'>{props.user?.profile?.nickname || 'boycot2017@163.com'}</div>
                    <div className='desc'>
                        {props.user?.profile?.description || props.user?.profile?.signature || '人间烟火味，最抚凡人心'}
                    </div>
                </div>
                <div className='others flexbox-h align-c'>
                    <div className='follows'><span>{props.user?.profile?.follows || 0}</span>关注</div>
                    <div className='followeds'><span>{props.user?.profile?.followeds || 0}</span>粉丝</div>
                    <div className='level'><span>Lv.{props.user?.level ||  0 }</span></div>
                </div>
            </div>
            </Card>
            <Card className='apps'
            style={{width: '100%', backgroundColor: '#f8f8f8'}}
            bodyStyle={{ borderRadius: '10px', boxShadow: '0 0 10px #e8e8e8', margin: '0', backgroundColor: '#fff' }}
            >
                <Grid columns={4} gap={12} className='apps-list'>
                {
                    items.map(el =>
                        <Grid.Item key={el.name}>
                        <div className={'flexbox-v align-c'}>
                            <span className='icon'>{el.icon}</span>
                            <span className='name'>{el.name}</span>
                        </div>
                    </Grid.Item>
                    )
                }
                </Grid>
                <div className='footer'><AddOutline className='icon' />音乐应用</div>
            </Card>
            <Card className='favirous'
            style={{textAlign: 'left', width: '100%', backgroundColor: '#f8f8f8'}}
            bodyStyle={{ borderRadius: '10px', boxShadow: '0 0 10px #e8e8e8', margin: '16px 0', backgroundColor: '#fff' }}>
                <List>
                    <List.Item
                    prefix={<Avatar style={{'--border-radius': '10px'}} src={props.user?.profile?.avatarUrl || ''} />}
                    extra='心动模式'
                    description={`${props.user?.profile?.playlistCount || 0}首，已下载${props.user?.profile?.eventCount || 0}首`}
                    >
                        我喜欢的音乐
                    </List.Item>
                </List>
            </Card>
            {/* <Empty description='个人中心，敬请期待'  style={{height: '80%'}} /> */}
        </div>
        <Button block color='primary' style={{width: '80%'}} onClick={onLogout} size='large'>
            退出登录
        </Button>
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalCenter)
