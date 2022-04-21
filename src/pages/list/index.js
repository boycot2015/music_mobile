import { useState } from 'react'
import { Grid, JumboTabs, Popup, DotLoading  } from 'antd-mobile'
import InfiniteScroll from '@/components/InfiniteScroll'
import {
    AppstoreOutline
} from 'antd-mobile-icons'
import {
    useLocation,
  } from 'react-router-dom'
import MusicItem from '@/components/MusicItem'
import CateMenu from './cate'
import { getPlaylist, getCatlist } from '@/api/list'
import './style.less'
function CategoryList() {
    const location = useLocation()
    const { state: query } = location
    const [hasMore, setHasMore] = useState(true)
    const [showCateMenu, setShowCateMenu] = useState(false)
    showCateMenu
    const [state, setState] = useState({
        activeCate: '全部',
        playlists: [],
        categories: [],
        cateList: [],
        params: { ...query },
        hotCateList: []
    })
    const fetchData = (params) => {
        return getPlaylist({...query, ...state.params, limit: 24, order: 'hot', ...params }).then(res => {
            if (res.code === 200) {
                if (state.params.offset) {
                    setState({
                        ...state,
                        params: {...state.params, offset: ++state.params.offset || 0 },
                        playlists: params?.offset ? [...state.playlists, ...res.playlists] : res.playlists
                    })
                    setTimeout(() => {
                        setHasMore(res.more)
                    }, 500);
                } else {
                    if (!state.params.cat) {
                        return getCatlist({}).then(cate => {
                            if (cate.code === 200) {
                                setState({
                                    ...state,
                                    params: {...state.params, offset: 1 },
                                    playlists: res.playlists,
                                    categories: cate.categories,
                                    hotCateList: [{name: '全部', id: 0}, ...cate.sub?.filter(el => el.hot)],
                                    cateList: cate.sub
                                })
                            }
                        })
                    } else {
                        setState({
                            ...state,
                            params: {...state.params, offset: 1 },
                            playlists: res.playlists,
                        })
                    }
                }
            }
        })
    }
    const loadMore = () =>  {
        return fetchData({offset: state.params.offset })
    }
    const handleCateChange = (key) => {
        setState({
            ...state,
            activeCate: key,
            playlists: [],
            params: { cat: key, offset: 0 },
        })
        setShowCateMenu(false)
    }
    return <div className='category-list' style={{"minHeight": 300}}>
            <div className="cate-list">
                <JumboTabs
                onChange={(key) => handleCateChange(key)}
                activeKey={state.activeCate}
                >
                    {
                        (state.hotCateList && state.hotCateList.length) ? state.hotCateList.map((el, index) =>
                        <JumboTabs.Tab
                        key={el.name}
                        title={el.name}
                        className={`cate-list-item ${el.name === state.activeCate && 'active'}`}
                        />) : <DotLoading color={'primary'} />
                    }
                </JumboTabs>
                <div className="more-icon" onClick={() => setShowCateMenu(true)}>
                    <AppstoreOutline />
                </div>
            </div>
            <div className="cate-content">
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
                <InfiniteScroll loadMore={loadMore} threshold={250} hasMore={hasMore} />
            </div>
        <Popup
            forceRender
            position='right'
            bodyStyle={{
                width: '100%'
            }}
            visible={showCateMenu}
            onMaskClick={() => {
                setShowCateMenu(false)
        }}>
            <CateMenu activeCate={state.activeCate} cateList={state.cateList} categories={state.categories}
            setActive={(cate, index) => handleCateChange(cate.name)}
            setShowCateMenu={(val) => setShowCateMenu(val)} />
        </Popup>
    </div>
}
export default CategoryList