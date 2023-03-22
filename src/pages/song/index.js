import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';
import { Image, Divider, Skeleton, Ellipsis, DotLoading } from 'antd-mobile'
import PlayList from '@/components/PlayList'

import {
    useLocation,
  } from 'react-router-dom'
import { getPlaylistDetail, getSongDetail } from '@/api/song'
import './style.less'
function CustomList(props) {
    const location = useLocation()
    let { state: query } = location
    const { onSetSongs, songs, song, onChangeShowStatus, appConfig } = props;
    query = query || {}
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        coverDetail: {},
        playDetail: '',
        ids: [],
        offset: 0,
        playlists: songs || []
    })
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            return getPlaylistDetail({id: query.id, type: 1}).then(list => {
                if (list.code === 200) {
                    let ids = list.playlist?.trackIds?.map(el => el.id) || []
                    return getSongDetail({ ids: ids.slice(0, 20).join(',') }).then(res => {
                        if (res.code === 200) {
                            setState({
                                ...state,
                                ids,
                                offset: 1,
                                coverDetail: list.playlist,
                                playlists: res.songs
                            })
                            onSetSongs({ songs: res.songs, ids })
                        }
                        setLoading(false)
                    })
                }
            })
        }
        fetchData()
    }, [])
    return <div className='song-list flexbox-v' style={{"minHeight": 300, ...props.style}}>
        {state.coverDetail.coverImgUrl && !loading ? <div className={`${!query.office ? 'custom-cover flexbox-h align-c just-c' : ''} cover-main`}>
            <div className="cover-bg" style={!query.office ? {
            backgroundImage: `url(${state.playlists[0]?.al?.picUrl || state.coverDetail.coverImgUrl})`
        } : {}}></div>
            <Image className='img' src={query.office ? state.playlists[0]?.al?.picUrl : state.coverDetail.coverImgUrl} />
            <div className="cover-text">
                <div className="name">{state.coverDetail.name}</div>
                <Divider className='line'>{query.updateFrequency || '每日更新'}</Divider>
                <Ellipsis rows={2} className="description" content={state.coverDetail.description} />
            </div>
        </div> : <Skeleton animated className={'customSkeleton'} />}
        {!loading ? <PlayList songIds={state.ids} /> : <DotLoading color='primary' style={{margin: 10}} />}
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomList)