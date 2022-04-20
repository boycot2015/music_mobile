import { useEffect, useState } from 'react'
import { Grid, DotLoading } from 'antd-mobile'
import {
    useLocation,
  } from 'react-router-dom'
import MusicItem from '@/components/MusicItem'
import { getPersonalized, getPrivatecontentList } from '@/api/home'
function CustomList() {
    const [state, setState] = useState({
        data: []
    })
    const location = useLocation()
    const { state: query } = location
    let hasFetch = false // 防止多次渲染
    useEffect(() => {
        const fetchData = async () => {
            !query.type && getPersonalized().then(res => {
                if (res.code === 200) {
                    setState({
                        ...state,
                        data: res.result
                    })
                }
            })
            query.type === 1 && getPrivatecontentList().then(res => {
                if (res.code === 200) {
                    setState({
                        ...state,
                        data: res.result
                    })
                }
            })
        }
        !hasFetch && fetchData();
        hasFetch = true
    }, [])
    return <div className='custom-list' style={{"minHeight": 300, paddingTop: 10}}>
        {state.data && state.data.length ? <Grid
            columns={location.state.type === 1 ? 2 : 3}
            style={{
                padding: '0 15px'
            }} className={'music-grid'}
            gap={8}>
             {
                 state.data.map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem type={location.state.type} data={el} />
                  </Grid.Item>
                  )
             }
        </Grid> : <DotLoading color='primary' />}
    </div>
}
export default CustomList