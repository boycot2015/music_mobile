import { useState, createRef } from 'react'
import { Grid, Empty  } from 'antd-mobile'
import InfiniteScroll from '@/components/InfiniteScroll'
import MusicItem from '@/components/MusicItem'
import UserItem from '@/components/UserItem'
import http from '@/api/request'
import PlayList from '@/components/PlayList'
    // import './style.less'
function SearchPlayList(props) {
    const [hasMore, setHasMore] = useState(true)
    const playListRef = createRef(null)
    const [state, setState] = useState({
        playlists: [],
        params: { ...props.query || {} },
    })
    const fetchData = (params) => {
        params = {type: 1000, limit: 24, order: 'hot', ...state.params, ...params }
        return http('get', props.url || '/cloudsearch', params).then(res => {
            if (res.code === 200) {
                let key = (params.key || 'playlist') + 's'
                // console.log(params, key, 'state.params');
                if (state.params.offset) {
                    setState({
                        ...state,
                        params: {...state.params, offset: ++state.params.offset || 0 },
                        playlists: params?.offset ? [...state.playlists, ...res.result[key] || []] : res.result[key] || []
                    })
                    setTimeout(() => {
                        setHasMore(res.more)
                    }, 500);
                } else {
                    setState({
                        ...state,
                        params: {...state.params, offset: 1 },
                        playlists: res.result[key] || [],
                    })
                }
            } else {
                setState({
                    ...state,
                    playlists: [],
                })
                setHasMore(false)
            }
        })
    }
    const loadMore = () =>  {
        return fetchData({offset: state.params.offset })
    }
    const { type = 1 } = props.query
    return <>
        {(state.playlists && state.playlists.length) ? (type === 1 || type === 1006) ? <PlayList songIds={state.playlists.map(el => el.id)} emptyText={'暂无数据'} ref={playListRef} /> : <div className="play-list">
            {<Grid
                columns={type === 1002 ? 2 : 3}
                style={{
                    padding: '0 15px'
                }} className={'music-grid'}
                gap={8}>
                {
                    state.playlists.map((el, index) =>
                    <Grid.Item key={index}>
                        {type === 1002 ? <UserItem style={{textAlign: 'left'}} {...el} /> : <MusicItem url={(type === 1004 || type === 1014) ? '/mv/detail' : ''} data={el} />}
                    </Grid.Item>
                    )
                }
            </Grid>}
            <InfiniteScroll loadMore={loadMore} threshold={250} hasMore={hasMore} />
        </div> : <InfiniteScroll loadMore={loadMore} threshold={250} hasMore={hasMore} />}
    </>
}
export default SearchPlayList