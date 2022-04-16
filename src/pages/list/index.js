import { useEffect, useState } from 'react'
import { Grid, DotLoading, InfiniteScroll } from 'antd-mobile'
import {
    useLocation,
  } from 'react-router-dom'
import MusicItem from '@/components/MusicItem'
import { getPlaylist, getCatlist } from '@/api/list'
import './style.less'
function CustomList() {
    const location = useLocation()
    const { state: query } = location
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [state, setState] = useState({
        activeCate: 0,
        playlists: [],
        cateList: [],
        offset: 0,
        params: { ...query },
        hotCateList: []
    })
    const fetchData = (params) => {
        setLoading(true)
        return getPlaylist({...query, ...state.params, limit: 45, order: 'hot', ...params }).then(res => {
            setLoading(false)
            if (res.code === 200) {
                setState({
                    ...state,
                    offset: ++state.offset || 0,
                    playlists: params?.offset ? [...state.playlists, ...res.playlists] : res.playlists
                })
                setTimeout(() => {
                    setHasMore(res.more)
                }, 500);
            }
        })
    }
    const loadMore = () =>  {
        return fetchData({offset: state.offset })
    }
    useEffect(() => {
        const fetchCateData = () => {
            getCatlist({}).then(cate => {
                if (cate.code === 200) {
                    setState({
                        ...state,
                        hotCateList: cate.sub?.filter(el => el.hot),
                        cateList: cate.sub
                    })
                }
            })
        }
        fetchCateData()
    }, [])
    const handleCateChange = (params, index) => {
        setState({
            ...state,
            activeCate: index,
            playlists: [],
            params: { cat: params.name, offset: 0 },
        })
    }
    return <div className='category-list flexbox-v' style={{"minHeight": 300}}>
        {
            <Grid
            className='cate-list'
            style={{
                margin: '0 0 15px',
            }}
            columns={5}
            gap={8}
            >
                {
                    (state.hotCateList && state.hotCateList.length) ? state.hotCateList.map((el, index) =>
                    <Grid.Item
                    key={el.name}
                    onClick={() => handleCateChange(el, index)}
                    className={`cate-list-item ${index === state.activeCate && 'active'}`}
                    >
                        {el.name}
                    </Grid.Item>) : null
                }
            </Grid>
        }

        {(state.playlists && state.playlists.length) ? <Grid
            columns={3}
            style={{
                padding: '0 15px'
            }} className={'music-grid'}
            gap={8}>
             {
                 state.playlists.map((el, index) =>
                 <Grid.Item key={index}>
                    <MusicItem data={el} />
                  </Grid.Item>
                  )
             }
        </Grid> : null}
        <InfiniteScroll loadMore={loadMore} threshold={100} hasMore={hasMore} />
    </div>
}
export default CustomList