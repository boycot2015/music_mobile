import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
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
function PlayList(props, ref) {
    // const location = useLocation()
    // let { state: query } = location
    const { onSetSongs, songs, songIds, ids, onChangeShowStatus, appConfig } = props;
    // query = query || {}
    const [hasMore, setHasMore] = useState(true)
    // const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        offset: 1,
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
            return getSongDetail(data).then(res => {
                if (res.code === 200) {
                    setState({
                        ...state,
                        offset: ++offset,
                        playlists: refresh ? res.songs : [...state.playlists, ...res.songs].filter((el, index, self) => self.findIndex(_ => el.id === _.id) === index)
                    })
                    setHasMore(res.songs.length > 0)
                }
            })
        } else {
            setHasMore(false)
        }
    }
    useEffect(() => {
        fetchSongs()
    }, [])
    const setPlayDetail = (el) => {
        props.onChangeSong(el.id).then(res => {
            onSetSongs({ songs: songs, ids: songIds || props.ids })
            props.setPlayList && props.setPlayList(state.playlists)
            onChangeShowStatus && onChangeShowStatus(false)
            props.setShowPlayList && props.setShowPlayList(false)
        })
    }
    return <div className='play-list' style={{"minHeight": 300, ...props.style}}>
        {(state.playlists && state.playlists.length) ? <Grid
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
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(forwardRef(PlayList))