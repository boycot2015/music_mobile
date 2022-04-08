import { useEffect, useState } from 'react'
import { Grid, Button } from 'antd-mobile'
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
    console.log(location, 'location')

    useEffect(() => {
        !location.state.type && getPersonalized().then(res => {
            if (res.code === 200) {
                setState({
                    ...state,
                    data: res.result
                })
            }
        })
        location.state.type === 1 && getPrivatecontentList().then(res => {
            if (res.code === 200) {
                setState({
                    ...state,
                    data: res.result
                })
            }
        })
    }, [])
    return <div className='home'>
        <Grid
            columns={location.state.type === 1 ? 2 : 3}
            style={{
                padding: '0 15px'
            }} className={'music-list-grid'}
            gap={8}>
             {
                 state.data.map(el =>
                 <Grid.Item key={el.id}>
                    <MusicItem type={location.state.type} data={el} />
                  </Grid.Item>
                  )
             }
        </Grid>
    </div>
}
export default CustomList