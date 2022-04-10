import { useEffect, useState } from 'react'
import { Grid, DotLoading, Image, Divider, Skeleton, Ellipsis } from 'antd-mobile'
import {
    useLocation,
  } from 'react-router-dom'
import MusicItem from '@/components/MusicItem'
import { getPlaylistDetail, getSongDetail } from '@/api/song'
import './style.less'
function CustomList() {
    const location = useLocation()
    const { state: query } = location
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({
        coverDetail: {},
        playlists: []
    })
    let hasFetch = false // 防止多次渲染
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            getPlaylistDetail({id: query.id, type: 1}).then(list => {
                if (list.code === 200) {
                    let ids = list.playlist?.trackIds?.map(el => el.id) || []
                    getSongDetail({ ids: ids.join(',') }).then(res => {
                        setLoading(false)
                        if (res.code === 200) {
                            setState({
                                ...state,
                                coverDetail: list.playlist,
                                playlists: res.songs
                            })
                        }
                    })
                }
            })
        }
        !hasFetch && fetchData();
        hasFetch = true
    }, [])
    return <div className='song-list flexbox-v' style={{"minHeight": 300}}>
        {state.coverDetail.coverImgUrl ? <div className='cover-main'>
            <div className="cover-bg"></div>
            <Image className='img' src={state.coverDetail.coverImgUrl} />
            <div className="cover-text">
                <div className="name">{state.coverDetail.name}</div>
                <Divider className='line'>每日更新</Divider>
                <Ellipsis rows={2} className="description" content={state.coverDetail.description} />
            </div>
        </div> : <Skeleton animated className={'customSkeleton'} />}
        {(state.playlists && state.playlists.length && !loading) ? <Grid
            columns={1}
            style={{
                padding: '0 15px'
            }} className={'music-list-grid'}
            gap={8}>
             {
                 state.playlists.map((el, index) =>
                 <Grid.Item key={el.id}>
                    <MusicItem data={el} index={index + 1} type={2} />
                  </Grid.Item>
                  )
             }
        </Grid> : <DotLoading color='primary' />}
    </div>
}
export default CustomList