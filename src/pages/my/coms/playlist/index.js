

import { List, Grid, Avatar, Button, Card } from 'antd-mobile'
import {
    useNavigate,
  } from 'react-router-dom'
import { connect } from 'react-redux'
import './styles.less'
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch'
function MyPlayList(props) {
    const navigate = useNavigate()
    // console.log(props.user, 'props.user');
    let { playlist = [], profile = {} } = props.user
    playlist = playlist.slice(1,)
    playlist.map(el => {
        el.isMyCreated = el.creator.userId === profile.userId
        return el
    })
    playlist = [{data: playlist.filter(el => el.isMyCreated), title: '创建的歌单'}, {data: playlist.filter(el => !el.isMyCreated), title: '收藏的歌单'}]
    const toDetail = (e, data) => {
        e.stopPropagation()
        if (!props.showPlayer) {
            navigate('/song/list', {state: {id: data.id, office: 0, updateFrequency: data.updateFrequency }})
            return
        }
        props.showPlayer(true)
    }
    return <>
        <Card className='favirous'
        style={{textAlign: 'left', width: '100%', backgroundColor: '#f8f8f8'}}
        bodyStyle={{ borderRadius: '10px', boxShadow: '0 0 10px #e8e8e8', margin: '16px 0 5px', backgroundColor: '#fff' }}>
            <List>
                <List.Item
                prefix={<Avatar style={{'--border-radius': '10px'}} src={props.user?.playlist[0]?.coverImgUrl || ''} />}
                extra='心动模式'
                onClick={(e) => toDetail(e, props.user?.playlist[0]) }
                description={`${props.user?.playlist[0]?.trackCount || 0}首，已下载${props.user?.playlist[0]?.subscribedCount || 0}首`}
                >
                    我喜欢的音乐
                </List.Item>
            </List>
        </Card>
        <Card className='flexbox-v align-c' bodyClassName='my-play-list' style={{backgroundColor: '#f8f8f8'}}>
            {
                playlist.map(val => <List  header={`${val.title}(${val.data.length}个)`} key={val.title} className='list'>
                {
                    val.data.map(el =>
                        <List.Item
                        className='list-item'
                        arrow={false}
                        onClick={(e) => toDetail(e, el) }
                        prefix={<Avatar src={el.coverImgUrl} />}
                        description={(el.trackCount || 0) + '首' + (el.isMyCreated ? '' : ',by ' + el.creator.nickname + '')}
                        key={el.id}>
                            <p className='ellipsis' style={{width: '310px'}}>{el.name}</p>
                        </List.Item>
                    )
                }
            </List>)
            }
        </Card>
    </>
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPlayList)
