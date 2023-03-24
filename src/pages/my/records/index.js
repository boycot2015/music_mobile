

import { Swiper, Tabs, Badge, DotLoading, Card } from 'antd-mobile'
import { useState, useEffect, createRef } from 'react'
import {
    useNavigate,
  } from 'react-router-dom'
import { connect } from 'react-redux'
// import {
//     AppstoreOutline,
// } from 'antd-mobile-icons'
import './styles.less'
import http from '@/api/request'

import PlayList from '@/components/PlayList'
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch'
function PlayRecordList(props) {
    const navigate = useNavigate()
    // console.log(props.user, 'props.user');
    const swiperRef = createRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [state, setState] = useState({
        loading: true,
        activeCate: '单曲',
        list: [{
            name: '单曲',
            url: '/record/recent/song',
            total: 0,
            data: []
        }, {
            name: '视频',
            url: '/record/recent/video',
            total: 0,
            data: []
        }, {
            name: '声音',
            url: '/record/recent/voice',
            total: 0,
            data: []
        }, {
            name: '歌单',
            url: '/record/recent/playlist',
            total: 0,
            data: []
        }, {
            name: '专辑',
            url: '/record/recent/album',
            total: 0,
            data: []
        }, {
            name: '播客',
            url: '/record/recent/dj',
            total: 0,
            data: []
        }]
    });
    const playListRef = createRef(null)
    let { playlist = [], profile = {} } = props.user
    playlist = playlist.slice(1,)
    playlist.map(el => {
        el.isMyCreated = el.creator.userId === profile.userId
        return el
    })
    const getData = (url = '/record/recent/song', limit = 1000, page = 1) => {
        setState((state) => {
            return {
                ...state,
                loading: true,
            }
        })
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
                    loading: !list.length,
                    list
                }
            })
            // console.log(list, '1232');
        })
    }
    useEffect(() => {
        getData()
    }, []);
    playlist = [{data: playlist.filter(el => el.isMyCreated), title: '创建的歌单'}, {data: playlist.filter(el => !el.isMyCreated), title: '收藏的歌单'}]
    // const toDetail = (e, data) => {
    //     e.stopPropagation()
    //     if (!props.showPlayer) {
    //         navigate('/song/list', {state: {id: data.id, office: 0, updateFrequency: data.updateFrequency }})
    //         return
    //     }
    //     props.showPlayer(true)
    // }
    const handleCateChange = (val) => {
        setState({
            ...state,
            activeCate: val
        })
        const index = state.list.findIndex(item => item.name === val)
        setActiveIndex(index)
        swiperRef.current?.swipeTo(index)
        getData(state.list.filter(el => el.name === val)[0]?.url, 1000, 1)
    }
    return <div className='flexbox-v my-records'>
        <div className="records-list">
            <Tabs
            onChange={(key) => handleCateChange(key)}
            activeKey={state.activeCate}
            >
                {
                    (state.list && state.list.length) ? state.list.map((el, index) =>
                    <Tabs.Tab
                    key={el.name}
                    title={<Badge content={el.total || ''} style={{ '--right': '-10px', '--top': '8px' }}>
                    {el.name}
                  </Badge>}
                    description={el.total || ''}
                    />) : <DotLoading color={'primary'} />
                }
            </Tabs>
            {
                (state.list && state.list.length) ? state.list.map(el => !state.loading && state.activeCate === el.name ?  <PlayList
                    songIds={[...el.data.map(el => el.resourceId)]}
                    emptyText={'暂无播放记录'}
                    ref={playListRef}
                    key={el.name}
                    /> :  null) : <DotLoading color={'primary'} />
            }
        </div>
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayRecordList)
