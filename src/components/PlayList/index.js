import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '@/redux/dispatch';
import { Grid, Image, Empty, Skeleton, Ellipsis } from 'antd-mobile'
import InfiniteScroll from '@/components/InfiniteScroll'
import {
    useLocation,
  } from 'react-router-dom'
import MusicItem from '@/components/MusicItem'
import { getPlaylistDetail, getSongDetail } from '@/api/song'
import './style.less'
function PlayList(props, ref) {
    // const location = useLocation()
    // let { state: query } = location
    const { onSetSongs, songs, songIds, ids, onChangeShowStatus, appConfig } = props;
    // query = query || {}
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        offset: 0,
        playlists: songs || []
    })
    useImperativeHandle(
        ref,
        () => ({ fetchSongs })
    )
    const fetchSongs = (refresh) => {
        let offset = refresh ? 0 : state.offset
        let data = { ids: (songIds || ids).slice(offset * 20, offset * 20 + 20).join(',') }
        if (data.ids) {
            setLoading(!state.offset)
            return getSongDetail(data).then(res => {
                if (res.code === 200) {
                    setState({
                        ...state,
                        offset: ++offset,
                        playlists: refresh ? res.songs : [...state.playlists, ...res.songs].filter((el, index, self) => self.findIndex(_ => el.id === _.id) === index)
                    })
                    setLoading(false)
                    setHasMore(res.songs.length > 0)
                } else {
                    setHasMore(false)
                    setLoading(false)
                }
            })
        } else {
            setHasMore(false)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchSongs(props.refresh)
    }, [props.refresh])
    const setPlayDetail = (el) => {
        props.onChangeSong(el.id).then(res => {
            onSetSongs({ songs: state.playlists, ids: songIds || props.ids })
            props.setPlayList && props.setPlayList(state.playlists)
            onChangeShowStatus && onChangeShowStatus(false)
            props.setShowPlayList && props.setShowPlayList(false)
        })
    }
    return <div className='play-list' style={{"minHeight": 300, ...props.style}}>
        {(state.playlists && state.playlists.length) && !loading ? <Grid
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
        </Grid> : !hasMore && <Empty description={props.emptyText || '暂无数据'} />}
        {state.playlists.length ? <InfiniteScroll loadMore={fetchSongs} threshold={250} hasMore={hasMore} /> : null}
    </div>
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(forwardRef(PlayList))