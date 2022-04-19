import { useEffect, useState } from 'react'
import { List, Grid, Image, DotLoading } from 'antd-mobile'
import {
    useLocation,
  } from 'react-router-dom'
import MusicItem from '@/components/MusicItem'
import { getToplist } from '@/api/list'
import { getPlaylistDetail, getSongDetail } from '@/api/song'

import './style.less'
function CustomList() {
    const location = useLocation()
    const { state: query } = location
    const [state, setState] = useState({
        activeCate: 0,
        topList: [],
        recommend: [],
        office: []
    })
    const fetchData = async (params) => {
        let res = await getToplist({...query, ...params })
        if (res.code === 200) {
            let datas = res.list.filter(el => el.ToplistType)
            await Promise.all(datas.map(async el => {
                let list = await getPlaylistDetail({id: el.id, type: 1})
                if (list.code === 200) {
                    let ids = list.playlist?.trackIds?.map(el => el.id).slice(0, 4) || []
                    let data = await getSongDetail({ ids: ids.join(',') })
                    el.songs = data.songs
                    return el
                }
            })).then((office) => {
                setState({
                    ...state,
                    office,
                    recommend: res.list.filter(el => !el.ToplistType).slice(0, 3),
                    topList: res.list.filter(el => !el.ToplistType).slice(3, res.list.length)
                })
            })
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return <div className='ph-list flexbox-v' style={{"minHeight": 300, paddingTop: 20}}>
        {state.office && state.office.length ? <>
            <div className="title">榜单推荐</div>
            {(state.recommend && state.recommend.length) ? <Grid
                columns={3}
                style={{
                    padding: '0 15px'
                }} className={'music-list'}
                gap={8}>
                {
                    state.recommend.map((el, index) =>
                    <Grid.Item key={index}>
                        <MusicItem data={el} />
                    </Grid.Item>
                    )
                }
            </Grid> : null}
            <div className="title">官方榜</div>
            {state.office && state.office.length ? <div className="office">
                <div className="office-list">
                    {state.office && state.office.map(office =>
                        <div className="office-list-item flexbox-h align-c just-between" key={office.id}>
                        <div className="left flex1  flexbox-v align-c just-c">
                            <div className="title">{office.name}</div>
                            <Image width={80} height={80} className='img' src={office.coverImgUrl} />
                        </div>
                        <div className="right flex2">
                            <Grid
                            columns={1}
                            style={{
                                padding: '0 15px'
                            }} className={'music-grid'}
                            gap={8}>
                                {
                                    office.songs?.map((song, index) =>
                                    <Grid.Item key={index}>
                                        <MusicItem data={song} className={'ph-grid'} hideDesc={true} index={index + 1} type={2} />
                                    </Grid.Item>
                                    )
                                }
                            </Grid>
                        </div>
                    </div>
                    )}
                </div>
            </div> : null}
            <div className="title">全球榜</div>
            {(state.topList && state.topList.length) ? <Grid
                columns={3}
                style={{
                    padding: '0 15px'
                }} className={'music-List'}
                gap={8}>
                {
                    state.topList.map((el, index) =>
                    <Grid.Item key={index}>
                    <MusicItem data={el} />
                    </Grid.Item>
                    )
                }
            </Grid> : null}
            {/* <InfiniteScroll loadMore={loadMore} threshold={250} hasMore={hasMore} /> */}
        </> : <DotLoading color='primary' />}
    </div>
}
export default CustomList