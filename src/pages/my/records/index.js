

import { List, JumboTabs, Avatar, DotLoading, Card } from 'antd-mobile'
import { useState, useEffect } from 'react'
import {
    useNavigate,
  } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    AppstoreOutline,
} from 'antd-mobile-icons'
import './styles.less'
import http from '@/api/request'
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch'
function MyPlayList(props) {
    const navigate = useNavigate()
    const [showCateMenu, setShowCateMenu] = useState(false)
    // console.log(props.user, 'props.user');
    const [state, setState] = useState({
        activeCate: '单曲',
        list: [{
            name: '单曲',
            url: '/record/recent/song',
            data: []
        }, {
            name: '视频',
            url: '/record/recent/video',
            data: []
        }]
    });
    let { playlist = [], profile = {} } = props.user
    playlist = playlist.slice(1,)
    playlist.map(el => {
        el.isMyCreated = el.creator.userId === profile.userId
        return el
    })
    const getData = (url = '/record/recent/song', limit = 20, page = 1) => {
        http('get', url, { limit, page }).then(res => {
           let list = state.list.map(el => {
                if (el.url === url) {
                    el.data = res.data.list
                    el.total = res.data.total
                }
                return el
            })
            setState((state) => {
                return {
                    ...state,
                    list
                }
            })
            console.log(list, '1232');
        })
    }
    useEffect(() => {
        getData()
    }, []);
    playlist = [{data: playlist.filter(el => el.isMyCreated), title: '创建的歌单'}, {data: playlist.filter(el => !el.isMyCreated), title: '收藏的歌单'}]
    const toDetail = (e, data) => {
        e.stopPropagation()
        if (!props.showPlayer) {
            navigate('/song/list', {state: {id: data.id, office: 0, updateFrequency: data.updateFrequency }})
            return
        }
        props.showPlayer(true)
    }
    const handleCateChange = (val) => {
        setState({
            ...state,
            activeCate: val
        })
        getData(state.list.filter(el => el.name === val)[0]?.url, 20, 1)
    }
    return <div className='flexbox-v'>
        <div className="cate-list">
            <JumboTabs
            onChange={(key) => handleCateChange(key)}
            activeKey={state.activeCate}
            >
                {
                    (state.list && state.list.length) ? state.list.map((el, index) =>
                    <JumboTabs.Tab
                    key={el.name}
                    title={el.name}
                    className={`cate-list-item ${el.name === state.activeCate && 'active'}`}
                    />) : <DotLoading color={'primary'} />
                }
            </JumboTabs>
            {/* <div className="more-icon" onClick={() => setShowCateMenu(true)}>
                <AppstoreOutline />
            </div> */}
        </div>
        <Card className='flexbox-v align-c' bodyClassName='my-play-list' style={{backgroundColor: '#f8f8f8'}}>
            {
                state.list.map(val => <List style={{display: val.name == state.activeCate ? 'block' : 'none'}} header={`${val.name}(${val.data.length}个)`} key={val.name} className='list'>
                {
                    val.data.map(el =>
                        <List.Item
                        className='list-item'
                        arrow={false}
                        onClick={(e) => toDetail(e, el) }
                        prefix={<Avatar src={el.data?.al?.picUrl} />}
                        description={''}
                        // (el.trackCount || 0) + '首' + (el.isMyCreated ? '' : ',by ' + el.creator.nickname + '')
                        key={el.resourceId}>
                            <p className='ellipsis' style={{width: '310px'}}>{el.data?.name}</p>
                        </List.Item>
                    )
                }
            </List>)
            }
        </Card>
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPlayList)
