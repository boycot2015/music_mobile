import { useState } from 'react'
import { Grid, DotLoading  } from 'antd-mobile'
import InfiniteScroll from '@/components/InfiniteScroll'
import MusicItem from '@/components/MusicItem'
import UserItem from '@/components/UserItem'
import http from '@/api/request'
// import './style.less'
function SearchPlayList(props) {
    const [hasMore, setHasMore] = useState(true)
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
    return <div className="list-content" style={{
        maxHeight: 'calc(100vh - 3.9rem)',
        padding: '0.24rem 0',
        textAlign: 'center',
        overflowY: 'auto',
    }}>
    {(state.playlists && state.playlists.length) ? <Grid
        columns={props?.query?.type === 1002 ? 2 : 3}
        style={{
            padding: '0 15px'
        }} className={'music-grid'}
        gap={8}>
        {
            state.playlists.map((el, index) =>
            <Grid.Item key={index}>
                {props?.query?.type === 1002 ? <UserItem style={{textAlign: 'left'}} {...el} /> : <MusicItem data={el} />}
            </Grid.Item>
            )
        }
    </Grid> : null}
    <InfiniteScroll loadMore={loadMore} threshold={250} hasMore={hasMore} />
</div>
}
export default SearchPlayList