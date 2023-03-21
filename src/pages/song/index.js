import { useState } from 'react'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';
import { Grid, Image, Divider, Skeleton, Ellipsis } from 'antd-mobile'
import InfiniteScroll from '@/components/InfiniteScroll'
import {
    useLocation,
  } from 'react-router-dom'
import MusicItem from '@/components/MusicItem'
import { getPlaylistDetail, getSongDetail } from '@/api/song'
import './style.less'
function CustomList(props) {
    const location = useLocation()
    let { state: query } = location
    query = query || {}
    // console.log(query, 'queryqueryquery');
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(!props.songsList)
    const { onSetSongs, onChangeShowStatus } = props;
    const [state, setState] = useState({
        coverDetail: {},
        playDetail: '',
        ids: [],
        offset: 0,
        playlists: props.songsList || []
    })
    const fetchData = () => {
        setLoading(true)
        return getPlaylistDetail({id: query.id || props.id, type: 1}).then(list => {
            if (list.code === 200) {
                let ids = list.playlist?.trackIds?.map(el => el.id) || []
                return getSongDetail({ ids: ids.slice(0, 20).join(',') }).then(res => {
                    setLoading(false)
                    if (res.code === 200) {
                        setState({
                            ...state,
                            ids,
                            offset: 1,
                            coverDetail: list.playlist,
                            playlists: res.songs
                        })
                        onSetSongs(res.songs)
                    }
                })
            }
        })
    }
    const fetchSongs = () => {
        if (state.offset === 0) {
            return fetchData()
        } else {
            let data = { ids: state.ids.slice(state.offset * 20, state.offset * 20 + 20).join(',') }
            if (data.ids) {
                return getSongDetail(data).then(res => {
                    if (res.code === 200) {
                        setState({
                            ...state,
                            offset: ++state.offset,
                            playlists: [...state.playlists, ...res.songs]
                        })
                        setHasMore(res.songs.length > 0)
                    }
                })
            } else {
                setHasMore(false)
            }
        }
    }
    const setPlayDetail = (el) => {
        props.onChangeSong(el.id).then(res => {
            onChangeShowStatus && onChangeShowStatus(false)
            props.setShowPlayList && props.setShowPlayList(false)
        })
    }
    return <div className='song-list flexbox-v' style={{"minHeight": 300, ...props.style}}>
        {state.coverDetail.coverImgUrl &&  !props.id ? <div className={`${!query.office ? 'custom-cover flexbox-h align-c just-c' : ''} cover-main`}>
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
        {(state.playlists && state.playlists.length && !loading) ? <Grid
            columns={1}
            style={{
                padding: '0 15px'
            }} className={'music-grid'}
            gap={8}>
             {
                 state.playlists.map((el, index) =>
                 <Grid.Item key={el.id}>
                    <MusicItem data={el} showPlayer={() => setPlayDetail(el)} index={index + 1} type={2} />
                  </Grid.Item>
                  )
             }
        </Grid> : null}
        <InfiniteScroll loadMore={fetchSongs} threshold={250} hasMore={hasMore} />
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomList)