import { useEffect, useState } from 'react'
import { Grid, DotLoading } from 'antd-mobile'
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
    const [state, setState] = useState({
        activeCate: 0,
        playlists: [],
        cateList: [],
        params: { ...query },
        hotCateList: []
    })
    let hasFetch = false // 防止多次渲染
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            getCatlist({}).then(cate => {
                if (cate.code === 200) {
                    getPlaylist({...query, ...state.params, limit: 45, order: 'hot' }).then(res => {
                        setLoading(false)
                        if (res.code === 200) {
                            setState({
                                ...state,
                                hotCateList: cate.sub?.filter(el => el.hot),
                                cateList: cate.sub,
                                playlists: res.playlists
                            })
                        }
                    })
                }
            })
        }
        !hasFetch && fetchData();
        hasFetch = true
    }, [state.params])
    const handleCateChange = (params, index) => {
        setState({
            ...state,
            activeCate: index,
            params: { cat: params.name, offset: 1 },
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
                    state.hotCateList.map((el, index) =>
                    <Grid.Item
                    key={el.name}
                    onClick={() => handleCateChange(el, index)}
                    className={`cate-list-item ${index === state.activeCate && 'active'}`}
                    >
                        {el.name}
                    </Grid.Item>)
                }
            </Grid>
        }

        {(state.playlists && state.playlists.length && !loading) ? <Grid
            columns={3}
            style={{
                padding: '0 15px'
            }} className={'music-grid'}
            gap={8}>
             {
                 state.playlists.map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem data={el} />
                  </Grid.Item>
                  )
             }
        </Grid> : <DotLoading color='primary' />}
    </div>
}
export default CustomList